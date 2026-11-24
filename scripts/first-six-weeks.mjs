// Writes src/data/first-six-weeks.json, the data behind the homepage's
// "first six weeks" chart: Aisha's real check-ins for one domain over her
// first 42 days, when her baseline was first worked out, and the day-of-week
// finding as the app's detector would state it from those days alone.
//
//   node scripts/first-six-weeks.mjs
//
// Reads the sample dataset from the app repo beside this one
// (../symetric-native/src/lib/demo/aisha-tables.json). Run it after the
// sample report is rebuilt and commit the JSON: the site build does not have
// the app repo, so it only ever reads the committed file.
//
// Nothing here is typed in. If the data stops supporting the finding, this
// throws instead of writing a chart that claims it.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(here, "../../symetric-native");
const out = resolve(here, "../src/data/first-six-weeks.json");

const DOMAIN = "sensory_sensitivity";
const DAYS = 42;
// The same thresholds as the app's src/lib/detection/day-of-week-patterns.ts.
const MIN_DIFFERENCE = 1.5;
const MIN_WEEKS = 4;
const DOW_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const { builtFor, tables } = JSON.parse(readFileSync(resolve(app, "src/lib/demo/aisha-tables.json"), "utf8"));

const domainsSource = readFileSync(resolve(app, "src/lib/domains.ts"), "utf8");
const labelMatch = domainsSource.match(new RegExp(DOMAIN + ":\\s*\\{\\s*label:\\s*'([^']+)'"));
if (!labelMatch) throw new Error(`No label for ${DOMAIN} in the app's domains.ts`);

const utc = (date) => Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10));
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const round1 = (x) => Math.round(x * 10) / 10;

const firstDate = tables.check_ins.map((c) => c.scheduled_date).sort()[0];
const dayOf = (date) => Math.round((utc(date) - utc(firstDate)) / 86_400_000);

const scheduled = tables.check_ins.filter((c) => dayOf(c.scheduled_date) < DAYS);
const answered = scheduled
  .filter((c) => c.status === "completed" && c[DOMAIN] !== null && c[DOMAIN] !== undefined)
  .sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));

// One dot per answered check-in: [day (with time of day as the fraction), score, is it the standout weekday].
const timeOfDay = (iso) => (+iso.slice(11, 13) * 60 + +iso.slice(14, 16)) / 1440;

// Day scores, as the app builds them: the mean of a day's answers.
const byDate = new Map();
for (const c of answered) {
  if (!byDate.has(c.scheduled_date)) byDate.set(c.scheduled_date, []);
  byDate.get(c.scheduled_date).push(c[DOMAIN]);
}
const days = [...byDate].map(([date, vals]) => ({ date, score: mean(vals), dow: new Date(utc(date)).getUTCDay() }));

function isoWeek(date) {
  const d = new Date(utc(date));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  return `${d.getUTCFullYear()}-W${Math.ceil(((d.getTime() - yearStart) / 86_400_000 + 1) / 7)}`;
}

// The standout weekday: the largest gap between one weekday and the rest.
let best = null;
for (let dow = 0; dow < 7; dow++) {
  const target = days.filter((d) => d.dow === dow);
  const others = days.filter((d) => d.dow !== dow);
  if (target.length < 3 || others.length < 10) continue;
  const standoutAvg = mean(target.map((d) => d.score));
  const comparisonAvg = mean(others.map((d) => d.score));
  const difference = Math.abs(standoutAvg - comparisonAvg);
  if (!best || difference > best.difference) {
    const weeks = new Set(target.map((d) => isoWeek(d.date)));
    let consistentWeeks = 0;
    for (const wk of weeks) {
      const t = target.filter((d) => isoWeek(d.date) === wk).map((d) => d.score);
      const o = others.filter((d) => isoWeek(d.date) === wk).map((d) => d.score);
      if (o.length && mean(t) > mean(o) === standoutAvg > comparisonAvg) consistentWeeks++;
    }
    best = { dow, standoutAvg, comparisonAvg, difference, weekCount: weeks.size, consistentWeeks, dayCount: target.length };
  }
}
if (!best || best.difference < MIN_DIFFERENCE || best.weekCount < MIN_WEEKS) {
  throw new Error(`The first ${DAYS} days no longer show a day-of-week pattern in ${DOMAIN} the app would report. Rethink the chart before rebuilding it.`);
}

// When the app first replaced the default baseline with one worked out from her own answers.
const firstBaseline = tables.baselines
  .filter((b) => b.domain === DOMAIN && b.source !== "default")
  .sort((a, b) => a.set_at.localeCompare(b.set_at))[0];
if (!firstBaseline || dayOf(firstBaseline.set_at.slice(0, 10)) >= DAYS) {
  throw new Error(`No worked-out ${DOMAIN} baseline inside the first ${DAYS} days.`);
}

const data = {
  builtFor,
  domain: DOMAIN,
  label: labelMatch[1],
  days: DAYS,
  scheduled: scheduled.length,
  answered: answered.length,
  baseline: { day: dayOf(firstBaseline.set_at.slice(0, 10)), score: firstBaseline.baseline_score },
  pattern: {
    dayName: DOW_NAMES[best.dow],
    standoutAvg: round1(best.standoutAvg),
    comparisonAvg: round1(best.comparisonAvg),
    weekCount: best.weekCount,
    consistentWeeks: best.consistentWeeks,
    dayCount: best.dayCount,
  },
  dots: answered.map((c) => [
    Math.round((dayOf(c.scheduled_date) + timeOfDay(c.scheduled_at)) * 100) / 100,
    c[DOMAIN],
    new Date(utc(c.scheduled_date)).getUTCDay() === best.dow ? 1 : 0,
  ]),
};

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(data) + "\n");
console.log(`${data.label}: ${data.answered} of ${data.scheduled} check-ins answered in ${DAYS} days`);
console.log(`baseline ${data.baseline.score} from day ${data.baseline.day}`);
console.log(`${data.pattern.dayName}s ${data.pattern.standoutAvg} against ${data.pattern.comparisonAvg}, ${data.pattern.consistentWeeks} of ${data.pattern.weekCount} weeks`);
