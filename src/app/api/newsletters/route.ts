import { sendEmail } from "@/utils/sendEmail";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await sendEmail({
      from: `"Juliet Newsletter" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Newsletter!",
      html: `${newsletterTemplate(email)}`,
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
