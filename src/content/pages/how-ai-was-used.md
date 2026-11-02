---
title: How AI was used to build symetric
description: 'AI helped write the code. It never sees what you log, and it never decides what your data means.'
label: AI assisted implementation
---

<p class="in-short">In short: AI helped me write the code. It never sees what you log, and it never decides what your data means. Every pattern symetric shows you is plain arithmetic on your own numbers, with rules I set, and it never guesses at a diagnosis.</p>

symetric started in February 2026 as the app I needed for my own symptoms, and it's now a native app for iOS and Android. It was built by one person with AI assisted implementation. I'm not a developer, so I'll be straight with you about what that means.

It wasn't vibe coded in a couple of prompts over a long weekend. Prior to app store launch in November 2026 I iterated on the app for months. I have used the app myself Every. Single. Day. and I stand by it.

## Who did what

<div class="plain">
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>Me:</b> what gets measured, how a pattern is judged, every threshold, the design, and what the app is and isn't allowed to say about you. The method is written up in full on <a href="/for-clinicians">the clinicians page</a>.</span>
  </div>
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>AI:</b> writing and checking code to that spec, change by change, with me reviewing and using the result.</span>
  </div>
  <div class="line">
    <span class="tick" aria-hidden="true">&#10005;</span>
    <span class="txt"><b>Nobody, human or AI:</b> reading your entries to interpret them. No AI model is part of the app you use.</span>
  </div>
</div>

<div class="arch-diagram">
  <div class="arch-node">
    <p class="arch-label">Your phone</p>
    <p class="arch-detail">Check-ins, baselines, patterns, everything symetric works out about you is calculated here, on your device.</p>
  </div>
  <div class="arch-link" aria-hidden="true">&darr;</div>
  <div class="arch-node">
    <p class="arch-label">Your encrypted account</p>
    <p class="arch-detail">Stores your entries, walled off from every other account. Never analyses them.</p>
  </div>
  <div class="arch-excluded">
    <span class="tick no" aria-hidden="true">&#10005;</span>
    <span>No AI or LLM provider is anywhere in this picture. Nothing you log is ever sent to one.</span>
  </div>
</div>

## If you're still waiting on answers

A lot of people using symetric have one diagnosis, a couple of suspected ones, and a referral that hasn't come through yet. That's exactly when an app guessing at what's wrong would do the most harm, so symetric doesn't.

<div class="plain">
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>It describes, it never labels.</b> You'll see things like "anxiety and gut moved together" or "dizziness is worst in the mornings". You'll never see "this looks like POTS" or "this looks like ADHD". That conversation belongs with your clinician.</span>
  </div>
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>One bad week can't become a finding.</b> Two things need at least 14 check-ins in common before symetric will say they move together. Nothing appears until there's enough behind it.</span>
  </div>
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>It tells you how sure it is.</b> Every pattern is graded Solid, Partial or Limited, so a stretch where you missed check-ins shows up as thin, rather than looking as certain as a good month.</span>
  </div>
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>Your normal is yours.</b> Everything is measured against your own baseline, the middle of your own recent scores, so one awful day doesn't shift what counts as typical for you.</span>
  </div>
  <div class="line">
    <span class="tick" aria-hidden="true">&check;</span>
    <span class="txt"><b>Edits are visible.</b> If you change an entry later, symetric records that it was edited and when, so a clinician reading your report can tell an original entry from a revised one.</span>
  </div>
</div>

## Keeping your data safe

You sign in with a one-time link sent to your email, so there's no password to steal or reuse. Your entries are walled off at the database itself, which means a bug in the app can't show your data to anyone else. Reminders only ever say a check-in is ready, never what you logged. The full picture, in plain words, is on [your data](/your-data).

<div class="faq">
<details>
<summary>The technical detail, for anyone who wants it</summary>

<p><b>Storage and access.</b> Entries are stored in Supabase (Postgres) in Sydney. Access rules live in the database as Row Level Security rather than in the app, so every query is limited to the signed-in account. Sign-in is passwordless through Supabase Auth, so there is no hand-rolled credential or session handling. Real-time sync is switched off in the client, which keeps open connections and attack surface down.</p>

<p><b>No server-side analysis.</b> Pattern detection and baseline recalculation run in the app. The small server functions that exist schedule check-ins, send reminders, record consent and delete accounts, and none of them read your scores. No health data is sent to any model provider.</p>

<p><b>Reminders.</b> Push notifications go through Expo's push service to Apple and Google, honour your do-not-disturb hours, and delivery receipts are checked rather than just the send, so a device that has quietly stopped receiving reminders gets noticed.</p>

<p><b>Data integrity.</b> Check-ins carry an edit count and an edited-at time. Baselines are a rolling median over the last 30 days, recalculated weekly, because a median resists a single outlier far better than a mean. Correlations need 14 overlapping check-ins. Check-in windows are timezone aware, with a 30-minute window to answer and a 90-minute rescue window for a late one, and there's one sleep log per date.</p>

</details>
</div>
