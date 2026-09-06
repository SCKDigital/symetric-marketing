// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: replace with the real production domain before deploying. @astrojs/sitemap
// and the canonical/OG URLs in BaseLayout.astro both derive from this.
export default defineConfig({
  site: "https://symetric.app",
  integrations: [sitemap()],
});
