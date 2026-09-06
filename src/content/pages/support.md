---
title: Support & contact
description: 'Get help with symetric, or get in touch.'
label: Help & contact
---

## Get in touch

<!-- TODO: form has no real submission endpoint yet. Needs one wired up
     (a Supabase table matching the app's own backend, or a service like
     Formspree) before this can go live. Static site, no server routes. -->

<form class="contact-form" method="post" action="#">
  <div class="contact-field">
    <label for="contact-email">Your email</label>
    <input type="email" id="contact-email" name="email" placeholder="you@example.com" required />
  </div>
  <div class="contact-field">
    <label for="contact-reason">What&rsquo;s this about</label>
    <select id="contact-reason" name="reason" required>
      <option value="" selected disabled>Choose one</option>
      <option value="general">General enquiry</option>
      <option value="support">App support</option>
    </select>
  </div>
  <div class="contact-field">
    <label for="contact-message">Message</label>
    <textarea id="contact-message" name="message" placeholder="What&rsquo;s going on?" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Send message</button>
</form>

Need to delete your account or your data specifically? That’s quicker done directly in the app. See [how your data is deleted](/privacy#10-deleting-your-account-and-your-data).
