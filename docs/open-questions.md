# Open questions pulled out of live copy

These were sitting as visible `[TODO: ...]` markers in published pages, where site visitors could read them. They've been removed from the copy and tracked here instead. Nothing below is blocking the site being live, but each needs a real answer before the related page can be called final.

## Refund mechanics (guarantee page)

Removed from `src/content/pages/guarantee.md`, along with a "Draft, not yet legal advice" banner that was showing at the top of the page.

The page now says only what's actually settled: track twice a day for 28 days, full refund if it hasn't been useful, no questions asked, claimed by getting in touch via support. Still undecided:

- Whether refund requests are handled directly or pushed through the Apple App Store / Google Play refund flow. This matters, because an app store refund isn't yours to grant or refuse, which sits awkwardly with "no questions asked".
- How long after the 28-day mark someone has to ask. Right now the page implies no deadline, so as written the guarantee is open-ended.
- Whether the support form needs a refund-specific reason option.
- Legal review of the whole guarantee alongside the Terms of Use, by an Australian lawyer, given it interacts with Australian Consumer Law guarantees.

## Medication names in the privacy policy (resolved)

Removed from `src/content/pages/privacy.md`. The question was whether the medication name itself is captured when a user records a medication event.

Answered from the app source (`src/types/marker.ts`, `src/components/MarkerModal.tsx`): there's no separate medication-name field. Each marker has one free-text `label`, auto-prefixed with "Started ", "Stopped ", "Increased to " or "Decreased to " depending on the action, with a placeholder of "e.g. Started 20mg, Increased dosage". So a medication name is stored only if the user types one into that label.

The policy now states this directly. Worth re-checking if the marker model ever gains a structured medication field, since the wording would then be wrong.

## Store listing URLs

`src/content/pages/first-six-weeks.md` has a "Get symetric" button pointing at `#`, with an HTML comment noting real App Store and Google Play URLs aren't available yet. This one is invisible to readers (it's an HTML comment, not rendered text) but the dead button isn't. Same dead link pattern is worth checking across other pages before launch.
