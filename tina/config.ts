import { defineConfig } from "tinacms";

// Text fields with this hint accept the three inline marks the site renders
// (src/lib/inline.ts).
const MARKS = "Use **bold**, ==highlight== or [link text](/page).";

const DOMAINS = [
  { value: "mood", label: "Mood" },
  { value: "energy", label: "Energy" },
  { value: "anxiety", label: "Anxiety" },
  { value: "concentration", label: "Concentration" },
  { value: "irritability", label: "Irritability" },
  { value: "social", label: "Social depletion" },
  { value: "sensory", label: "Sensory overwhelm" },
  { value: "motivation", label: "Motivation" },
];

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  // Local editing only, no TinaCloud project connected.
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "brand",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            description: "Used for the page's meta description, not shown on the page itself.",
          },
          {
            type: "string",
            name: "label",
            label: "Kicker label",
            description: "Small label shown above the title on the page (optional).",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "home",
        label: "Homepage",
        path: "src/content/home",
        format: "md",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false }, router: () => "/" },
        fields: [
          str("seoTitle", "Browser tab title"),
          str("seoDescription", "Search engine description", { component: "textarea" }),
          group("hero", "Hero", [
            str("eyebrow", "Small label"),
            str("heading", "Headline"),
            str("lede", "Intro", { component: "textarea" }, MARKS),
            str("tryLabel", "Demo button"),
            str("reportLabel", "Report button"),
            { type: "string", name: "trust", label: "Three short reassurances", list: true },
          ]),
          {
            type: "object",
            name: "insights",
            label: "Insight cards around the demo",
            description: "Only the first three are shown. Wrap the word to colour in ==double equals==.",
            list: true,
            ui: { itemProps: (i: any) => ({ label: i?.label }) },
            fields: [
              str("label", "Small label"),
              str("text", "Finding", { component: "textarea" }, MARKS),
              {
                type: "string",
                name: "colour",
                label: "Colour of the ==highlighted== word",
                required: true,
                options: DOMAINS,
              },
            ],
          },
          group("demo", "Demo", [
            str("buttonLabel", "Start button"),
            str("note", "Note under the button", { component: "textarea" }),
            { type: "string", name: "steps", label: "Tour steps", list: true },
          ]),
          cards("facts", "At-a-glance facts", "Icons and colours follow the order."),
          group("gets", "What you get", [str("eyebrow", "Small label"), str("heading", "Heading"), cards("cards", "Cards")]),
          group("report", "Sample report", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("text", "Text", { component: "textarea" }, MARKS),
            { type: "string", name: "chips", label: "What's inside (tags)", list: true },
            str("buttonLabel", "Button"),
            str("fine", "Small print", {}, MARKS),
          ]),
          group("who", "Who it's for", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("text", "Text", { component: "textarea" }, MARKS),
            {
              type: "object",
              name: "weeks",
              label: "Week cards",
              list: true,
              ui: { itemProps: (i: any) => ({ label: i?.when }) },
              fields: [
                str("when", "When"),
                str("lead", "Headline"),
                str("rest", "Text"),
                { type: "number", name: "filled", label: "Bars filled (out of 6)", required: true },
              ],
            },
            str("linkText", "Link to The first six weeks"),
          ]),
          group("data", "Your data", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            cards("cards", "Cards", "Icons follow the order: lock, person, download."),
            str("linkText", "Link to Your data"),
          ]),
          group("price", "Price", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("text", "Text", { component: "textarea" }, MARKS),
            str("amount", "Price"),
            str("terms", "Line under the price"),
            { type: "string", name: "included", label: "What's included", list: true },
          ]),
          group("faq", "FAQ", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            {
              type: "object",
              name: "items",
              label: "Questions",
              list: true,
              ui: { itemProps: (i: any) => ({ label: i?.q }) },
              fields: [str("q", "Question"), str("a", "Answer", { component: "textarea" }, MARKS)],
            },
          ]),
          group("founder", "Who built it", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("text", "Text", { component: "textarea" }, MARKS),
            str("linkText", "Link to About"),
          ]),
          group("closing", "Closing", [
            str("heading", "Heading"),
            str("getLabel", "Get the app button"),
            str("demoLabel", "Demo button"),
            str("waitlistLabel", "Waitlist label"),
            str("waitlistButton", "Waitlist button"),
          ]),
        ],
      },
      {
        name: "tracks",
        label: "What it tracks",
        path: "src/content/tracks",
        format: "md",
        match: { include: "what-it-tracks" },
        ui: { allowedActions: { create: false, delete: false }, router: () => "/what-it-tracks" },
        fields: [
          str("seoTitle", "Browser tab title"),
          str("seoDescription", "Search engine description", { component: "textarea" }),
          str("eyebrow", "Small label"),
          str("heading", "Headline"),
          str("lede", "Intro", { component: "textarea" }, MARKS),
          {
            type: "object",
            name: "tiers",
            label: "Always on / optional list",
            list: true,
            ui: { itemProps: (i: any) => ({ label: i?.name }) },
            fields: [
              str("name", "Name"),
              str("status", "Status"),
              { type: "boolean", name: "on", label: "Highlight as always on" },
            ],
          },
          group("core", "Mind and sleep", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("mindTitle", "Mind card title"),
            str("mindText", "Mind card text", { component: "textarea" }, MARKS),
            str("sleepTitle", "Sleep card title"),
            str("sleepText", "Sleep card text", { component: "textarea" }, MARKS),
            str("quiet", "Paragraph under the cards", { component: "textarea" }, MARKS),
          ]),
          group("body", "Body", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("intro", "Intro", { component: "textarea" }, MARKS),
            { type: "string", name: "domains", label: "Body domains (the count updates itself)", list: true },
            str("domainsNote", "Text after the domain list", { component: "textarea" }, MARKS),
            { type: "string", name: "events", label: "Events (the count updates itself)", list: true },
            str("mapTitle", "Body map, bold lead"),
            str("mapText", "Body map, text", { component: "textarea" }, MARKS),
            str("note", "Small print", { component: "textarea" }, MARKS),
          ]),
          group("cycle", "Cycle", [
            str("eyebrow", "Small label"),
            str("heading", "Heading"),
            str("text", "Text", { component: "textarea" }, MARKS),
            { type: "string", name: "callout", label: "Callout paragraphs", list: true, ui: { component: "textarea" } },
          ]),
          group("closing", "Closing", [
            str("heading", "Heading"),
            str("tryLabel", "Demo button"),
            str("reportLabel", "Report button"),
          ]),
        ],
      },
    ],
  },
});

// Helpers for the two single-page collections above, so each field reads as
// one line.
function str(name: string, label: string, ui: Record<string, unknown> = {}, description?: string): any {
  return { type: "string", name, label, required: true, description, ui };
}

function group(name: string, label: string, fields: any[]): any {
  return { type: "object", name, label, fields };
}

function cards(name: string, label: string, description?: string): any {
  return {
    type: "object",
    name,
    label,
    description,
    list: true,
    ui: { itemProps: (i: any) => ({ label: i?.title }) },
    fields: [str("title", "Title"), str("text", "Text", { component: "textarea" }, MARKS)],
  };
}
