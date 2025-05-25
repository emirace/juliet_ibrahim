import { sendEmail2 } from "@/utils/sendEmail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const mailOptions = {
      from: `"WIFT Ghana" <${process.env.STEAM_EMAIL_USER}>`,
      to: process.env.STEAM_EMAIL_USER!,
      subject: `Join Movement - WIFT Ghana`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await sendEmail2(mailOptions);

    return new Response(
      JSON.stringify({ message: "Your request has been sent successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
