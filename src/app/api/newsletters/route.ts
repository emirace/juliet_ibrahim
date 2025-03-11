import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SERVICE,
      port: parseInt(process.env.PORT || "465", 10),
      secure: true,
      // secureConnection: false,
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
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS, email);
    // Send email
    await transporter.sendMail({
      from: `"Your Newsletter" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Newsletter!",
      html: newsletterTemplate(email),
    });

    return new Response(
      JSON.stringify({ message: "Newsletter sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// HTML Email Template
function newsletterTemplate(email: string) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px;">
      <h2 style="color: #333; text-align: center;">🚀 Welcome to Our Newsletter!</h2>
      <p>Hello,</p>
      <p>Thank you for subscribing to our newsletter! We’re excited to keep you updated with our latest news, exclusive content, and special offers.</p>
      <p>Your registered email: <strong>${email}</strong></p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 14px; text-align: center; color: #666;">
        If you didn’t subscribe, you can <a href="#" style="color: red;">unsubscribe</a> anytime.
      </p>
    </div>
  `;
}
