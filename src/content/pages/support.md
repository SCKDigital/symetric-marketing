---
title: Support & contact
description: 'Get help with symetric, or get in touch.'
label: Help & contact
---

## Get in touch

<!-- Posts to the app backend's site-forms function (symetric-native repo, supabase/functions/site-forms), which
     stores the message, emails it to support@symetric.app and redirects to
     /thanks/message. -->

<form class="contact-form" method="post" action="https://ovfnewvetuimfqitswdk.supabase.co/functions/v1/site-forms">
  <input type="hidden" name="form" value="contact" />
  <div class="hp" aria-hidden="true"><label>Company <input type="text" name="company" tabindex="-1" autocomplete="off" /></label></div>
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
