import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Input validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SERVICE,
      port: parseInt(process.env.PORT || "465", 10),
      secure: true,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      debug: true,
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER, // Admin/Support email
      subject: `New Contact Us Message: ${subject}`,
      html: contactTemplate(name, email, subject, message),
    });

    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending contact email:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// HTML Email Template for Contact Form
function contactTemplate(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px;">
      <h2 style="color: #333;">📩 New Contact Us Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #eee; padding: 10px; border-radius: 5px;">${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 14px; text-align: center; color: #666;">This message was sent from your website's Contact Us form.</p>
    </div>
  `;
}
