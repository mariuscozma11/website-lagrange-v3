import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, email, phone, company, message } = body;

    // Validation
    if (!fullname || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long. Please keep it under 5000 characters." },
        { status: 400 }
      );
    }

    const recipients = (process.env.CONTACT_EMAILS || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      console.error("CONTACT_EMAILS env var is empty or not set");
      return NextResponse.json(
        { error: "Unable to send message right now. Please try again later." },
        { status: 500 }
      );
    }

    // Sanitize for HTML email
    const safeName = sanitize(fullname);
    const safeEmail = sanitize(email);
    const safePhone = phone ? sanitize(phone) : "";
    const safeCompany = company ? sanitize(company) : "";
    const safeMessage = sanitize(message);

    const { error } = await resend.emails.send({
      from: "Lagrange Engineering <contact@lagrangeengineering.ro>",
      to: recipients,
      replyTo: email,
      subject: `New inquiry from ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #171717; font-size: 20px;">New Contact Form Submission</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #171717; font-size: 14px;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #737373; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #171717; font-size: 14px;">
                <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            ${safePhone ? `
            <tr>
              <td style="padding: 8px 0; color: #737373; font-size: 14px; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0; color: #171717; font-size: 14px;">${safePhone}</td>
            </tr>
            ` : ""}
            ${safeCompany ? `
            <tr>
              <td style="padding: 8px 0; color: #737373; font-size: 14px; vertical-align: top;">Company</td>
              <td style="padding: 8px 0; color: #171717; font-size: 14px;">${safeCompany}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; color: #737373; font-size: 14px; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #171717; font-size: 14px; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
            <p style="margin: 0; color: #a3a3a3; font-size: 12px;">
              Sent from lagrange.dev contact form
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Unable to send message right now. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
