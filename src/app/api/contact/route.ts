import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website_hp } = body;

    // Honeypot check for spam prevention
    if (website_hp) {
      // Spam bot detected - return simulated success
      return NextResponse.json(
        { success: true, message: 'Message received successfully.' },
        { status: 200 }
      );
    }

    // Input Validation
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

    // Optional integration: If RESEND_API_KEY is configured in env, dispatch email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'portfolio@resend.dev',
            to: 'touzeeh@engineer.com',
            subject: `New Portfolio Message from ${name}`,
            text: `From: ${name} (${email})\n\n${message}`,
          }),
        });
      } catch (err) {
        console.error('Failed to dispatch via Resend:', err);
      }
    }

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
