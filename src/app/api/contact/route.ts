import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website_hp } = body;

    // 1. Honeypot check for spam bots
    if (website_hp) {
      return NextResponse.json(
        { success: true, message: 'Message received successfully.' },
        { status: 200 }
      );
    }

    // 2. Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid name (at least 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a detailed message (at least 10 characters).' },
        { status: 400 }
      );
    }

    let dispatched = false;

    // Option A: Web3Forms (100% Free Email Forwarder to your inbox, no domain setup needed)
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            subject: `New Portfolio Inquiry from ${name.trim()} (touzeeh.xyz)`,
            from_name: 'touzeeh.xyz Contact Form',
          }),
        });
        if (res.ok) dispatched = true;
      } catch (err) {
        console.error('Web3Forms dispatch error:', err);
      }
    }

    // Option B: Discord Webhook (100% Free instant push notifications to your phone/desktop)
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Portfolio Notifier',
            embeds: [
              {
                title: '📬 New Message on touzeeh.xyz',
                color: 0x8b5cf6, // Violet
                fields: [
                  { name: '👤 Sender Name', value: name.trim(), inline: true },
                  { name: '✉️ Email', value: email.trim(), inline: true },
                  { name: '📝 Message', value: message.trim(), inline: false },
                ],
                footer: { text: 'touzeeh.xyz • Contact Hub' },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
        dispatched = true;
      } catch (err) {
        console.error('Discord webhook dispatch error:', err);
      }
    }

    // Option C: Resend API (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'touzeeh@engineer.com';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'portfolio@resend.dev',
            to: toEmail,
            reply_to: email.trim(),
            subject: `New Portfolio Message from ${name.trim()}`,
            text: `From: ${name} (${email})\n\nMessage:\n${message}`,
          }),
        });
        dispatched = true;
      } catch (err) {
        console.error('Resend dispatch error:', err);
      }
    }

    // Option D: Formspree (if configured)
    const formspreeId = process.env.FORMSPREE_FORM_ID;
    if (formspreeId) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });
        dispatched = true;
      } catch (err) {
        console.error('Formspree dispatch error:', err);
      }
    }

    // Log in server environment for verification
    console.log(`[Contact Form Received] From: ${name} (${email}) | Dispatched: ${dispatched}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! Your message has been received.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
