# Copy action plan

From the Aisha-persona review of the full site, 2026-09-06. Ordered by what's blocking, not by how easy it is. Each item says who it's blocked on, because roughly half of this can't be done by editing copy.

Aisha, for this plan: early twenties, wants the point immediately, needs reassurance about data, needs to know what she personally gets out of it. Undiagnosed or partly diagnosed, used to being dismissed, paying for this herself.

---

## Tier 0: the site doesn't work yet

Nothing below this tier matters until these are done. A visitor who wants the app right now cannot get it, and a visitor outside Australia cannot leave their details.

**1. Four dead "Get symetric" buttons.** `href="#"` on the homepage hero, the homepage close section, `what-it-tracks.astro`, and `first-six-weeks.md`. Blocked on real App Store and Google Play URLs existing.

Interim option while the listings don't exist: point them at `#waitlist` and relabel to something honest ("Join the waitlist"), rather than leaving a primary CTA that silently does nothing. A button that does nothing is worse than a button that admits the app isn't out yet.

**2. Waitlist form goes nowhere.** `action="#"`, no endpoint. This is a static site with no server routes, so it needs either a Supabase table (matching the app's existing backend, so there's one less service in the stack) or something like Formspree. Small engineering task. Blocked on nobody. Right now the site's only capture mechanism for international interest fails silently, which is worse than not having a form.

**3. Contact form goes nowhere.** Same problem, same fix, on `support.md`. Also worth adding the refund-specific reason option to the dropdown while it's being wired, since the guarantee page now sends refund requests through this form.

---

## Tier 1: the trust case has a hole in it

The site's strongest asset is that it's honest about data. The document that proves it currently looks unfinished, which cuts against the exact strength it's meant to support. Aisha is the kind of person who opens the privacy policy.

**4. Visible TODOs in the privacy policy and terms.** About ten in privacy, three in terms, including `[TODO: email provider]` and `[TODO: location]` inside the table telling people where their health data goes, `[TODO: X]` days for backup retention, `[TODO: postal address]`, and the terms liability limit still listed as three unpicked options.

Split by who can answer:

- Answerable from the app source, no decisions needed: the two `[TODO: settings path]` references, whether PostHog receives any health values, and whether an edit retains the previous value. Same approach as the medication-name TODO, which was resolved this way already.
- Needs a decision from you: postal address, email provider and its location, whether refunds run through the app stores.
- Needs the lawyer: the liability limit, and sign-off on both documents.
- Needs checking with Supabase: backup retention window and region.

The "Draft, not yet legal advice" banners should stay until the lawyer has actually reviewed. They're accurate, and a visible draft notice is more honest than a document that looks settled but isn't.

---

## Tier 2: the two missing assets

Both are conversion blockers rather than correctness problems, and both need something from you rather than a copy edit.

**5. Three placeholder screenshots on the homepage.** Grey boxes reading "Real screenshot". For someone deciding whether to use an app every day on her phone, seeing the interface is close to decisive. The three intended shots are already specified in the code (Insights with a flagged pattern, the Today check-in screen, Prepare with drafted questions) with captions written. It only needs the actual images.

The Today screen matters most of the three. The whole pitch is that the daily cost is thirty seconds, and a screenshot proves that faster than any sentence.

**6. No social proof of any kind.** No testimonials, no quotes, nothing from anyone but you. Aisha checks reviews before she buys anything.

Honest options, given the app is pre-launch with a handful of alpha testers:

- Ask the alpha testers for a sentence each, used anonymously and with permission. Even two is a change of state from zero.
- Failing that, make the founder's own use the proof explicitly, since it's real and unusually strong: daily use since February 2026, 300+ commits, every day without a gap. That's currently on the About page doing nothing for the homepage.

Don't invent or composite quotes. The site's credibility rests on not doing that sort of thing.

---

## Tier 3: promote the strengths that are already there

None of this is blocked. It's rearranging and sharpening what already exists, mostly by moving strong material to where she'll actually see it.

**7. Put the founder story on the homepage.** "I knew there was more going on with me than just 'anxiety'" is the most relatable sentence on the site for this persona and it's three clicks deep on About. Someone who's been told it's just anxiety recognises herself in that instantly. A short block on the homepage, two or three sentences plus a link to About, does more for credibility than anything else available pre-launch. This also partly covers the social proof gap in item 6.

**8. Lead the homepage data section with the concession.** The line that earns trust isn't "your data is encrypted", it's the your-data page admitting "Named staff can still access entries for support, technical or security reasons, and every one of those accesses is logged." Anyone can claim total privacy. Conceding a limit is what makes the rest believable, and right now that sentence is on a secondary page while the homepage runs the more ordinary claims.

**9. Reframe the report section around her outcome.** `report.md` opens "The report is the whole point", then lists "Executive summary", "Context & connections", "Data quality & methodology". Those are the clinician's words for the clinician's document. Her point is being believed and getting somewhere in the appointment.

Keep the page structure and the clinical page titles, they're right for the clinician audience and for her own confidence in the artefact. Change the opening so it leads with what changes for her when she hands it over, then let the page descriptions follow.

**10. Raise the "probably nothing" material.** The tag row ("No diagnosis needed", "On a waiting list", "Between clinicians", "Told it's 'probably nothing'") and the condition list sit well down the homepage, under "You don't need a diagnosis to use this". This is the section she'd screenshot and send to a friend. It's currently below the report, the app screenshots and the data section.

**11. Fix the body-tracking hedge.** what-it-tracks currently tells the reader body tracking is "newer than mind" and to "treat it as available now, not as a finished, established feature yet". Aisha's cluster is precisely those domains: joint instability, standing up, gut. The person with the most need is being told to expect less.

Keep the honesty, change the order: say what it covers and who it's for first, then the caveat. As written, the caveat arrives before she's learned there's anything worth caveating.

**12. Settle on one time figure.** The homepage grid header says "4 check-ins a day", the card below says three is the default, what-it-tracks says "a few", the hero says two minutes, individual check-ins are thirty seconds. It's roughly consistent, but she has to do arithmetic to trust it, and precision is the product. Pick the canonical numbers and use them everywhere.

**13. Fix the vitals contradiction.** "Nothing here is a score to fix" sits directly beside Mood 8.1, Anxiety 4.3, "+0.9 this week". The panel looks exactly like a scoreboard. Either change the caption to match what's shown, or drop the deltas so the visual matches the claim.

**14. Anchor the price.** AU$9.99 once is cheap and nothing frames it. One line against a monthly tracker subscription, or against a single specialist gap fee, does real work for someone in her early twenties paying out of pocket. The refund guarantee already handles risk; this handles value.

**15. Move the dense positioning paragraph off what-it-tracks.** Line 78, the "every tracker forces a trade" block, is the full positioning argument in one unbroken paragraph, sitting on the page she'll skim to find out what she'd actually be logging. It's a good argument in the wrong place. Either split it up, cut it to two sentences there, or move it to the homepage where the argument belongs.

**16. Surface "Australia only" earlier.** It's in the small hero kicker, and the waitlist explanation is at the very bottom of the homepage. An international visitor reads the entire page before finding out she can't buy it.

---

## Suggested order of work

Forms first (items 2 and 3), because they're unblocked, small, and currently losing every interested visitor who isn't in Australia. Then the code-answerable privacy TODOs (item 4, first group), because they're unblocked and go to the site's core claim.

Then all of Tier 3 in one editing pass, since it's a single coherent piece of work on copy that already exists, and items 7, 8 and 10 between them substantially change what the homepage does for this persona.

Screenshots and alpha quotes (items 5 and 6) as soon as you can supply them. The dead CTAs (item 1) get their real URLs when the store listings exist, with the waitlist redirect as the interim.

Everything needing the lawyer runs in parallel and doesn't block anything else.
