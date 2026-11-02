# Product Marketing Context

**Document version:** v7
**Last updated:** 2026-08-21

## Product Overview
**One-liner:** symetric is a quiet symptom-tracking app that turns thirty-second check-ins into a report you can hand your clinician.

**What it does:** A few times a day, symetric asks how you're doing across the domains you've chosen. Six weeks in, it starts surfacing patterns in your own data. Before an appointment, it generates a landscape PDF report whose length depends on what you track: executive summary, a domain summary against your own baseline, mind overview and charts, sleep, body overview and charts (if tracked), context and connections, and data quality and methodology.

**Product category:** Symptom tracker / personal health record-keeping tool (not a diagnostic device, not a wellness app).

**Product type:** Consumer mobile app, Android and iOS.

**Business model:** One-off payment, AU$9.99. No subscription, no ads, no in-app purchases. Backed by a 28-day guarantee: track twice a day for 28 days, and if there's no use in it, a no-questions-asked refund.

**Launch geography:** Australia only at launch. Both platforms (Android and iOS) are ready; the restriction is geographic, not platform-based. International visitors are directed to a waitlist for the international launch, not turned away silently.

## Target Audience

**Primary audience:** Neurodivergent and/or mood-disordered adults with low, fluctuating capacity, who have abandoned other tracking apps (usually over streak/gamification pressure) and have often not been believed by clinicians. **Demographic detail (added 2026-08-19, additive, not a repositioning):** this audience skews young Australian women, roughly 21-28, who are smart and want agency over their own health. This is a refinement of who the existing audience actually is, not a new or different audience, the "no streak, no blame, don't need a diagnosis" positioning stays exactly as it was. The synthesis: "taking control of your health" here means having real data instead of guesswork, not needing to already be disciplined or consistent to qualify. Agency and non-blame aren't in tension, agency is what the data gives them; freedom from streak-guilt is what makes using it sustainable enough to get that data in the first place. Copy should read as written *for* someone sharp and capable who's tired of being dismissed, not written *at* a fragile or diminished reader.

**Secondary audience (new as of the mind/body/cycle expansion):** People managing suspected or diagnosed physical conditions with overlapping presentation, hypermobility/EDS, POTS or other dysautonomia, chronic fatigue, where physical symptoms need to be correlated against mind-domain data for clinician context. This audience was not originally designed for; it opened up because body-domain tracking (fatigue, pain, joint instability, orthostatic symptoms, gut, subluxation/presyncope events) is now real and relevant to them, not because the core positioning shifted.

**Primary use case:** Walking into a fifteen-minute appointment with an accurate record of the last three months instead of whatever's memorable from the last few days.

**Jobs to be done:**
- Give me a record I trust more than my own memory of "the last few days."
- Let me track without punishing me for missing days.
- Hand my clinician something concrete instead of trying to summarise months from memory in the room.

**Use cases:**
- Daily/multiple-times-daily mind check-ins (mood, energy, anxiety, concentration, irritability, social depletion, sensory overwhelm, motivation), 2-8 domains, user-selected.
- Optional body check-ins (see Product Structure below) for people who want physical-symptom context alongside the mind picture.
- Optional day-1 cycle logging for people who want cycle context alongside everything else.
- Pre-appointment: generate a PDF report, add topics for discussion, flag patterns to raise.
- Post-appointment: log how it went (optional).

## Product Structure: four tiers, two core and two optional

This is the part that changed since the site was first built and needs to be represented clearly, without overclaiming.

**Mind (core, always on).** 8 domains: mood, energy, anxiety, concentration, irritability, social depletion, sensory overwhelm, motivation. User picks 2-8. Check-ins several times a day, thirty seconds each, inside a window the user sets (three a day default).

**Sleep (core, always on).** Distinct from the 8 mind domains, not one of the selectable ones, present regardless of which mind domains are chosen. Once a day, not several times: "How did you sleep last night?" (a rating) plus "Hours slept" (a secondary, optional number). Can be skipped for the day, same no-punishment ethos as everything else. Verified directly against the app codebase (`src/components/sleep/SleepPrompt.tsx`, `src/content/copy.ts`), not just taken at face value.

**Body (optional, alpha).** Opt-in at signup or in Settings. For people who want context for physical symptoms alongside the mind picture. Nine domains: fatigue across the day, joint and muscle pain, widespread pain, joint instability, breathing (breathlessness), dizziness (orthostatic, lightheaded/greying out), gut (nausea/bloating/cramping), brain fog, and end-of-day exhaustion (evening-only, required once body tracking is on). Plus separately loggable events: subluxation ("a joint went out"), presyncope (nearly fainted), migraine onset, crash onset (PEM-adjacent), reaction, injury or strain, palpitations. Pain and instability can be marked on a body map, and pain/breathlessness described with character words (aching, burning, electric or shooting). Cadence: once a day in the evening, with an optional morning check-in where the person picks up to four domains. Because this is genuinely in alpha, copy should read as "available now" but not oversell it as a mature, fully-established pillar the way Mind is.

**Day 1 cycle logging (optional, additional context).** Opt-in at signup or in Settings. The user logs Day 1 (period start) when it happens. From that single log, the app shows a simple running day count ("Day 13", etc.) purely by counting days since the last logged Day 1, resetting to Day 1 whenever a new one is logged. That's it: no phase prediction, no ovulation estimate, no correlation claims. This is a deliberate contrast with apps like Clue, symetric's cycle feature exists purely to add clinician context to the mind/body picture, not to predict or analyse the cycle itself. Marketing copy must never imply prediction or pattern detection on cycle data. (There is a separate, more advanced cycle-phase prediction and pattern-detection system in the codebase, still gated to a single test account and explicitly out of scope for public description, do not reference it.)

## Problems & Pain Points

**Core problem:** A fifteen-minute appointment has to somehow cover the last three months. Memory only reliably reaches back a few days, so the appointment ends up run on incomplete information, worse, exactly when concentration and memory are often among the things being described.

**Why alternatives fall short:** Most tracking apps use streaks and gamification, which punishes exactly the audience most likely to have a rough week and disengage. Missing a day becomes a reason to quit rather than a data point worth having.

**What it costs them:** Appointments spent re-explaining or under-explaining; patterns that never surface because nobody's tracking long enough to see them; feeling like "it's probably nothing" because there's no record to counter that with.

**Emotional tension:** This audience already carries self-blame. Any messaging that reads as "you should have tracked better" repels them immediately. The site must never blame the reader for gaps.

## Differentiation

**Key differentiators:**
- No punishment for missed check-ins, explicitly, repeatedly stated.
- On-device pattern detection, no data sent to an LLM or third party for interpretation.
- Real, downloadable sample report available with no email or sign-up.
- Domain-flexible: track 2 to 8 mind domains, don't need to opt into things that aren't relevant.
- Cycle tracking that doesn't predict or analyse, pure logging for context, a deliberate contrast to apps like Clue.

**Why customers choose us:** Because the alternative is showing up to an appointment and forgetting half of what mattered, and because other tracking apps' gamification mechanics actively work against a low-capacity, fluctuating-symptom audience.

## Objections & Anti-Personas

| Objection | Response |
|---|---|
| "I've tried tracking apps before and quit." | Most tracking apps punish gaps with streaks. symetric doesn't, a rough fortnight is data worth having, not a broken streak. |
| "I don't have a diagnosis, is this even for me?" | symetric doesn't need a label to work, it records what's reported and shows what it finds. No diagnosis required. |
| "Is my data actually private?" | The "your data" section states exactly what's encrypted, what's on-device, and what's never sent anywhere, no vague "we take privacy seriously" language. |

**Anti-persona:** Someone looking for a predictive or diagnostic tool. symetric explicitly does not diagnose, predict, or replace clinical care, on cycle data specifically it does not predict or correlate at all.

## Switching Dynamics

**Push:** Burned out on streak-based tracking apps; tired of walking into appointments underprepared.
**Pull:** No-punishment tracking, a real sample report visible with no signup, one-off payment instead of another subscription.
**Habit:** Whatever ad hoc method they currently use (notes app, memory, nothing).
**Anxiety:** Whether a new app will just be another thing to fail at, addressed directly by the "no streak to break" messaging.

## Customer Language

**Words to use:** "record," "context," "pattern," "baseline," "check-in," "log."
**Words to avoid:** "streak," "habit" (as something to build/maintain), "goal," anything implying prediction on cycle data, anything implying the reader failed to track well enough.

**Glossary:**
| Term | Meaning |
|---|---|
| Mind domains | The 8 core trackable areas: mood, energy, anxiety, concentration, irritability, social depletion, sensory overwhelm, motivation |
| Body tracking | Optional, alpha. Physical-symptom domains and events, see Product Structure |
| Day 1 | The date a period starts, the only thing a user directly logs for cycle tracking |
| Day X / day count | A simple count of days since the last logged Day 1, not a predicted cycle phase |
| Baseline | A rolling median of the user's own history, not a population average or clinical cut-off |

## Persona: Aisha

Full persona now lives in its own file: [`docs/persona-aisha.md`](../docs/persona-aisha.md). Authoritative for audience and voice decisions across the site. Internal only, never publish it or its "what success looks like" scenario as if it were a real testimonial.

Quick reference: 28, Melbourne, UX researcher, diagnosed anxiety/depression at 22, now querying ADHD. Wants to be a credible participant in her own care, not reactive in the room. Distrusts wellness apps (abandoned 3+ mood trackers), sensitive to bright screens, punished by streak mechanics, and interprets her own experience through whatever label an app's UI hands her. See the full file for the complete context, behaviour, and the decisions it's already settled (dark-by-default, no diagnosis names in copy, no streak punishment).

## Aesthetic Audit (2026-08-19)

A full pass against Aisha, not just copy this time.

**Real gaps found:**
- **Light mode, not dark.** The single biggest one, see Resolved open question above. Not yet actioned, deserves its own dedicated pass.
- **Red/green tick treatment in "your data."** The checklist used green for "good" (✓) and an orange/red-adjacent colour for "these bad things don't happen" (✕), functionally the exact traffic-light good/bad judgement pattern the persona doc warns against, even though it isn't literally red. Fixed: both marks now use a single neutral colour, differentiated by glyph shape alone, not colour-coded valence.
- **Domain accent colours are fairly saturated**, not "muted/desaturated" as specified. Left alone for now since they're tied to the app's own real domain colour-coding (consistency with the product itself matters), but worth reconsidering together with the dark-mode pass, since a dark palette usually needs different tint values anyway.

**Named but not changed, needs a decision, not a default assumption:**
- **Serif buttons/UI chrome.** The recent typography swing (dropping the sans-serif display face) put the whole site, including buttons, in serif. That decision was made for a different reason (reducing an AI-generated-design signature), not evaluated against Aisha specifically. Worth naming precisely because of who she is: a UX researcher, someone professionally attuned to interaction-design convention. Serif buttons are unconventional (most UI uses sans for actionable elements), still clearly clickable via shape/colour/hover state, but this is a real, specific risk for this exact reader that a general audience wouldn't necessarily notice. Not reversed without being asked, it was a deliberate, separately-approved choice.

**Checked, found already aligned, no change made:**
- **Navigation.** Flat, five plain-labelled top-level links, no nested dropdowns, nothing auto-expanding. Doesn't read as "walked through every feature."
- **Homepage length/scroll depth.** Long, but browsing a marketing page isn't the same effortful interaction the "limited capacity, especially mid-week" note is about, that's an in-app concern. The primary path (get the report, install) is reachable immediately in the hero without scroll-gating.
- **404 page tone.** "Might have moved, might never have existed. Either way, nothing's wrong on your end." Warm without being mournful, doesn't over-apologise, matches the Warm/Precise rules well.
- **Domain-coded card borders** (mood/energy/anxiety colours on the three cards in "what it asks of you"). Not a red/green issue, these are categorical labels (which domain a card is about), not a value judgement on any of the user's own data.

## Brand Voice

Five rules, from the Aisha persona doc, these supersede looser earlier phrasing:

- **Plain.** Year 10 reading level. No jargon, no Latin, no passive voice where active works. Cut the word if in doubt.
- **Warm.** Acknowledge this is hard without being mournful about it. She doesn't want pity, she wants to feel seen and capable.
- **Precise.** Say exactly what something does. Don't over-promise, don't hedge. "This check-in will take about 20 seconds" beats "a quick moment of reflection."
- **Non-clinical, with one deliberate exception.** Everywhere else, symptoms and observations only, never disorder names or diagnostic framing (`/what-it-tracks`, the product itself, onboarding). The homepage's "who it's for" section is the one deliberate exception: it names POTS, EDS, MCAS, ME/CFS, autism, ADHD, and anxiety/depression directly, as a recognition device, per `marketing/who-this-is-for.md` (2026-08-21, status: finalized). The reasoning there: specific named recognition converts better than generic reassurance for a visitor trying to self-identify, and the section pairs it immediately with "symetric doesn't diagnose, and you don't need a diagnosis to start" so it never reads as gatekeeping. This is a considered, sourced exception, not a lapse, don't silently revert it back to symptom language.
- **Consistent.** Same voice in onboarding, a check-in prompt, or an error message. Never shifts.

**Do:** symptom-focused language always. Acknowledge missed check-ins neutrally. Keep check-ins genuinely quick. Give her control over window/domains/frequency. Plain, kind copy that says what to do next. Dark, muted, desaturated colours. Explain the "why" briefly. Treat her data as hers, be transparent about it. Let her bring the report to her clinician rather than interpreting it for her.

**Don't:** never a condition/diagnostic name in the UI. Never red/green or traffic-light colouring, it implies a good/bad judgement on her own data. No streaks, gamification, or reward mechanics. Don't make any flow feel like filling in a form. Don't ask "how do you feel" vaguely, ground every prompt in a specific domain. Never frame the product as treatment or self-help, it's an evidence-gathering tool. **Never use the word "wellness"**, it signals a different kind of product entirely (already avoided on the current site, keep avoiding it).

## Proof Points

No fabricated metrics, testimonials, or user counts. The one real proof point is the sample report itself, downloadable with no gate. Do not invent statistics. The Aisha "what success looks like" scenario (a psychologist responding well to the report) is internal positioning guidance only, it must never be presented on the site as if it were a real user's story.

## Goals

**Primary business goal:** Get the reader to open the sample report, then install.
**Conversion action (Australia):** Download the sample PDF report (low-friction, no email) as the primary path to install, AU$9.99 one-off, 28-day no-questions-asked guarantee (track twice daily for 28 days) as the risk reversal.
**Conversion action (rest of world):** Join the waitlist for international launch, since the product isn't purchasable outside Australia yet.
**Current metrics:** None yet, pre-launch.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v7 (2026-08-21): Implemented `marketing/who-this-is-for.md` (finalized copy from the app repo) into the homepage's "who it's for" section, naming POTS, EDS, MCAS, ME/CFS, autism, ADHD, and anxiety/depression directly as a recognition device. This is a deliberate, sourced exception to the Non-clinical brand voice rule, documented there so it isn't mistaken for a lapse later.
- v6 (2026-08-21): Corrected price from AU$5.99 to AU$9.99 (user-confirmed) across this doc and the whole site, and resolved the "free vs paid" conflict that had been sitting unresolved in terms.md since it was first drafted.
- v5 (2026-08-20): Extracted the full Aisha persona into its own file, `docs/persona-aisha.md`, so it can be referenced independently of this doc. Left a short summary and a link here instead of the full text.
- v4 (2026-08-19): Added Sleep as a fourth product tier (core, always on, once daily, distinct from the 8 mind domains), verified against the app codebase rather than taken at face value. Ran a full aesthetic/navigation/layout audit against the Aisha persona (previous pass only covered copy), see the Aesthetic Audit section.
- v3 (2026-08-19): Added the Aisha persona doc as the authoritative audience/voice source, rewrote Brand Voice around its five-part framework (Plain/Warm/Precise/Non-clinical/Consistent) and Do's/Don'ts, resolved the dark-mode question (she prefers it, actioned since), flagged a live non-clinical-language violation to fix, added pricing (AU$5.99), the 28-day guarantee, Australia-only launch geography, and the international waitlist as a secondary conversion goal.
- v2 (2026-08-19): Added demographic detail to the primary audience (skews young, 21-28, Australian women), additive refinement not a repositioning, the non-blaming/no-diagnosis-required positioning stays as-is.
- v1 (2026-08-19): Initial context. Captures the mind/body/cycle product structure expansion (body tracking and day-1 cycle logging added since the site was first built), verified against the actual app codebase rather than taken at face value, to keep marketing claims accurate.
