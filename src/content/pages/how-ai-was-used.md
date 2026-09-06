---
title: 'Architecture, data model, and detection logic by a human'
description: 'How AI was used to build symetric, and the security and data-integrity work that went into it.'
label: AI assisted implementation
---

symetric was designed and shipped in February 2026 as a PWA for my personal symptom pattern detection. The app was built by one person with AI assisted implementation. The data model ([full detail for clinicians here](/for-clinicians)), product research, and UI are all mine but I’m not a developer. What I can say is that symetric wasn't vibe coded in a couple of prompts over a long weekend, I have been iterating over and over again for more than six months. Over 300 commits were made in the alpha version between February 2026 and August 2026. I have used the app myself Every. Single. Day. and I stand by it.

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

* **Row Level Security** enforced at the database - access rules live in Postgres, so a bug in the client can't expose another user's data
* **Supabase Auth** for passwordless, one-time-link sign in - no password to store, no hand-rolled credential storage or session handling
* **No backend compute layer** - all pattern detection runs client-side, so health scores are stored, but never processed on, a server
* **No AI/LLM integration** - no health data is sent to any model provider
* **Real time sync explicitly disabled** in the Supabase client - fewer open channels, smaller attack surface
* **Authenticated push** (Web Push + VAPID) with a service worker, DND hours, and handling for rotated FCM endpoints

## Refinement & data-integrity work

* **Edit audit trail** on check-ins (edit\_count, edited\_at) - you can tell an original entry from a revised one
* **Rolling median baseline**, recalculated weekly on-device - resists outliers better than a mean
* **Minimum evidence thresholds** before any pattern is shown: 14 overlapping check-ins for a correlation
* **Confidence grading** (Solid / Partial / Limited) rather than presenting weak signals as findings
* **Data quality indicators** surfaced in the Insights dashboard
* **Timezone aware check-in windows** with a 90-minute rescue window and 30-minute expiry, plus a one-log-per-date constraint on sleep
