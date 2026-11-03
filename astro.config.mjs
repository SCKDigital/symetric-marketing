// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: replace with the real production domain before deploying. @astrojs/sitemap
// and the canonical/OG URLs in BaseLayout.astro both derive from this.
export default defineConfig({
  site: "https://symetric.app",
  // The pages the forms redirect to aren't destinations in their own right.
  integrations: [sitemap({ filter: (page) => !/\/(thanks|form-error)\b/.test(page) })],
  // Tina's editor is a static file in public/admin, which the dev server only
  // serves at its full path. Send the short address there too.
  redirects: {
    "/admin": "/admin/index.html",
  },
});
