---
title: 'Architecture, data model, and detection logic by a human'
description: 'How AI was used to build symetric, and the security and data-integrity work that went into it.'
label: AI assisted implementation
---

symetric was designed and shipped in February 2026 as a PWA for my personal symptom pattern detection, and has since been rebuilt as a native app for iOS and Android. The app was built by one person with AI assisted implementation. The data model ([full detail for clinicians here](/for-clinicians)), product research, and UI are all mine but I’m not a developer. What I can say is that symetric wasn't vibe coded in a couple of prompts over a long weekend, I have been iterating over and over again for more than six months. Over 300 commits were made in the alpha version between February 2026 and August 2026. I have used the app myself Every. Single. Day. and I stand by it.

<div class="arch-diagram">
  <div class="arch-node">
    <p class="arch-label">Your phone</p>
    <p class="arch-detail">Check-ins, baselines, correlations, everything symetric calculates about you runs here, on-device.</p>
  </div>
  <div class="arch-link" aria-hidden="true">&darr;</div>
  <div class="arch-node">
    <p class="arch-label">Encrypted database</p>
    <p class="arch-detail">Row Level Security, isolated per account. Stores your entries. Never processes them.</p>
  </div>
  <div class="arch-excluded">
    <span class="tick no" aria-hidden="true">&#10005;</span>
    <span>No AI or LLM provider is ever in this picture. Nothing you log is sent to one.</span>
  </div>
</div>

## Security & data protection work

Access rules live in Postgres rather than the client, enforced by Row Level Security, so a bug in the app can't expose another user's data. Sign in is passwordless through Supabase Auth on a one-time link, which means there's no password to store and no hand-rolled credential or session handling to get wrong.

There's no backend compute layer at all. Pattern detection runs client-side, so your health scores are stored on a server but never processed on one, and no health data is sent to any model provider. Real-time sync is explicitly disabled in the Supabase client, which keeps open channels and attack surface down. Push notifications go through Apple's and Google's own delivery services, with do-not-disturb hours, and delivery receipts are checked rather than just the send, so a device that has quietly stopped receiving reminders gets noticed instead of silently missing check-ins.

## Refinement & data-integrity work

Check-ins carry an edit audit trail (edit\_count, edited\_at), so an original entry is always distinguishable from a revised one. Your baseline is a rolling median recalculated weekly on-device, which resists outliers far better than a mean would, and matters when one genuinely awful day shouldn't move what counts as normal for you.

Nothing surfaces as a finding until there's enough behind it. A correlation needs 14 overlapping check-ins before it appears at all, every pattern is graded Solid, Partial or Limited rather than presented flat, and data quality indicators sit in the Insights dashboard so a thin stretch is visible rather than hidden. Check-in windows are timezone aware, with a 90-minute rescue window, a 30-minute expiry, and a one-log-per-date constraint on sleep.
