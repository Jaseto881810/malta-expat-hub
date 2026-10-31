---
title: Contact Us
menuName: Contact
heroText: Questions, corrections or ideas for the guide? Send us a message and we will reply by email.
image: /assets/images/Luzzu.jpg
imageAlt: Colourful luzzu fishing boats
description: Contact Malta Expat Guide. Send a question, report a mistake or suggest a topic using our contact form.
inFooter: true
footerOrder: 2
draft: false
blocks:
- heading: Send us a message
  custom: |
    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm content-block">
      <h2 class="text-2xl font-bold mb-4 text-[#003366]">Send us a message</h2>
      <form class="contact-form" action="https://formsubmit.co/jasontestwork@gmail.com" method="POST">
        <input type="hidden" name="_subject" value="New message from maltaexpatguide.com">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_next" value="https://maltaexpatguide.com/message-sent.html">
        <input type="text" name="_honey" class="contact-honey" tabindex="-1" autocomplete="off" aria-hidden="true">

        <div class="contact-row">
          <label for="cf-name">Your name</label>
          <input id="cf-name" type="text" name="name" autocomplete="name" required>
        </div>
        <div class="contact-row">
          <label for="cf-email">Your email</label>
          <input id="cf-email" type="email" name="email" autocomplete="email" required>
        </div>
        <div class="contact-row">
          <label for="cf-topic">Topic</label>
          <select id="cf-topic" name="topic">
            <option>A question about living in Malta</option>
            <option>Report a mistake or something out of date</option>
            <option>Suggest a new topic</option>
            <option>Advertising or partnership</option>
            <option>Something else</option>
          </select>
        </div>
        <div class="contact-row">
          <label for="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="6" required></textarea>
        </div>
        <label class="contact-consent">
          <input type="checkbox" name="consent" value="Yes" required>
          <span>I agree that my name, email and message are used to reply to me, as explained in the <a href="/privacy-policy.html">Privacy Policy</a>.</span>
        </label>
        <button class="btn btn-primary" type="submit">Send message</button>
      </form>
    </div>
- heading: Before you write
  text: |
    - We usually reply within **2–3 working days**.
    - We cannot give personal legal, tax or immigration advice. For your own case, please contact the official office or a qualified professional.
    - Spotted a mistake? Tell us the **page name** and what is wrong, so we can fix it quickly.
---
