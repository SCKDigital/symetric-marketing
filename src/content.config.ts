import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    label: z.string().optional(),
  }),
});

// The homepage and What it tracks keep their layout in code; only the words
// live here, one file each, so Tina can edit them (tina/config.ts mirrors
// these shapes). Text fields accept **bold**, ==highlight== and [links](/url).
const titled = z.object({ title: z.string(), text: z.string() });
const domain = z.enum(["mood", "energy", "anxiety", "concentration", "irritability", "social", "sensory", "motivation"]);

const home = defineCollection({
  loader: glob({ pattern: "home.md", base: "./src/content/home" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    hero: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      lede: z.string(),
      tryLabel: z.string(),
      reportLabel: z.string(),
      trust: z.array(z.string()),
    }),
    insights: z.array(z.object({ label: z.string(), text: z.string(), colour: domain })),
    demo: z.object({ buttonLabel: z.string(), note: z.string(), steps: z.array(z.string()) }),
    facts: z.array(titled),
    gets: z.object({ eyebrow: z.string(), heading: z.string(), cards: z.array(titled) }),
    report: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      text: z.string(),
      chips: z.array(z.string()),
      buttonLabel: z.string(),
      fine: z.string(),
    }),
    who: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      text: z.string(),
      weeks: z.array(z.object({ when: z.string(), lead: z.string(), rest: z.string(), filled: z.number() })),
      linkText: z.string(),
    }),
    data: z.object({ eyebrow: z.string(), heading: z.string(), cards: z.array(titled), linkText: z.string() }),
    price: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      text: z.string(),
      amount: z.string(),
      terms: z.string(),
      included: z.array(z.string()),
    }),
    faq: z.object({ eyebrow: z.string(), heading: z.string(), items: z.array(z.object({ q: z.string(), a: z.string() })) }),
    founder: z.object({ eyebrow: z.string(), heading: z.string(), text: z.string(), linkText: z.string() }),
    closing: z.object({
      heading: z.string(),
      getLabel: z.string(),
      demoLabel: z.string(),
      waitlistLabel: z.string(),
      waitlistButton: z.string(),
    }),
  }),
});

const tracks = defineCollection({
  loader: glob({ pattern: "what-it-tracks.md", base: "./src/content/tracks" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    tiers: z.array(z.object({ name: z.string(), status: z.string(), on: z.boolean() })),
    core: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      mindTitle: z.string(),
      mindText: z.string(),
      sleepTitle: z.string(),
      sleepText: z.string(),
      quiet: z.string(),
    }),
    body: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      domains: z.array(z.string()),
      domainsNote: z.string(),
      events: z.array(z.string()),
      mapTitle: z.string(),
      mapText: z.string(),
      note: z.string(),
    }),
    cycle: z.object({ eyebrow: z.string(), heading: z.string(), text: z.string(), callout: z.array(z.string()) }),
    closing: z.object({ heading: z.string(), tryLabel: z.string(), reportLabel: z.string() }),
  }),
});

export const collections = { pages, home, tracks };
