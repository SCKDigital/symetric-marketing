# "Who this is for" — website section (finalized copy)

**Status**: Copy finalized — prose treatment confirmed over the chip/checklist alternative. Not yet built anywhere; there's no marketing site in this repo and the app's current landing screen (`AuthScreen.tsx`) is a minimal splash, not a content page. This is the reference doc for whoever builds the real site.
**Purpose**: Help visitors self-identify without gating access behind a diagnosis, and without the page reading as a diagnostic tool.
**Voice**: Calm, plain-spoken, no exclamation points, no emoji (per `.agents/product-marketing.md`).
**Placement**: Suggested for the homepage, below the main value-prop section — this is the moment a visitor decides "this is for me" or bounces.

---

## Section copy

### Built for bodies that don't fit one label

A lot of what Symetric's users are managing has something in common: it took years to get taken seriously, it doesn't show up cleanly on a single test, and it rarely shows up alone.

POTS. EDS. MCAS. ME/CFS. Autism. ADHD. Anxiety and depression that don't respond the way they're "supposed" to. Often two or three of these at once, tangled together in ways that make it hard to tell what's causing what.

If any of that sounds familiar — whether you have a formal diagnosis, a working theory, or just a growing folder of appointments that haven't added up to an answer yet — Symetric is built for you.

**Symetric doesn't diagnose, and you don't need a diagnosis to start.** It helps you track what's actually happening — in your body and your mind — so the pattern is visible to you, and to whoever you bring it to next.

---

## Notes for whoever builds this

- **The list is deliberately run-on prose, not a checklist or chip/tag selector.** A selectable list of conditions reads like triage or self-diagnosis, which is exactly the impression to avoid. Short declarative sentences ("POTS. EDS. MCAS.") let a reader recognize themselves in a beat, without the page ever asking them to pick one.
- **Autism and ADHD are included deliberately, not as an afterthought.** They're not "symptom" conditions the way POTS/EDS/MCAS/ME/CFS are, but they belong on this list for two real reasons: they're well documented as underdiagnosed and dismissed in women specifically, and there's growing clinical overlap between the hypermobility/dysautonomia cluster and neurodivergence — a meaningful share of Aisha's actual audience is living at that intersection. Symetric's existing mind check-in domains (`sensory_sensitivity` → "Sensory overwhelm," `social_battery` → "Social depletion," per `src/content/copy.ts`) already reflect this population — worth referencing those exact domain names elsewhere on the page as concrete proof, not just this list.
- **The "doesn't diagnose" line is not legal boilerplate — say it early and plainly, not buried in a footer disclaimer.** It does three jobs at once: keeps the product's claims honest, protects against being read as a diagnostic or medical-device tool, and — most important for Aisha specifically — explicitly welcomes people who are still mid-diagnostic-odyssey rather than implying the app is only for people who've already been formally sorted into a category.
- **Keep the named-condition list short and swap-able, not exhaustive.** The goal is recognition, not coverage. Resist the urge to keep adding conditions to this list over time — a longer list reads as trying to cover everyone, which reads as covering no one in particular. If a specific underserved community becomes a real acquisition channel later (e.g. a dedicated POTS/dysautonomia landing page), that's a separate, more specific page — not a reason to grow this one.
- **Decided: prose, not chips.** A loose inline wrap of plain-text condition terms was considered as a more scannable alternative, but prose reads as written by a person rather than generated from a taxonomy, and avoids any hint of a selectable list — that's the stronger signal for this audience specifically, so it's the confirmed direction. Revisit only if there's a concrete reason (e.g. a specific landing page needs to be more scannable than persuasive).
