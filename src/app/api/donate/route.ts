import { sendEmail2 } from "@/utils/sendEmail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, firstName, lastName, email, address, message } =
      await req.json();

    if (!amount || !email || !firstName || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const mailOptions = {
      from: `"Her STEAM" <${process.env.STEAM_EMAIL_USER}>`,
      to: process.env.STEAM_EMAIL_USER!,
      subject: `Donation - ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nAddress: ${address}\nAmount: ${amount}\n\nMessage:\n${message}`,
    };

    await sendEmail2(mailOptions);

    return new Response(
      JSON.stringify({ message: "Your request has been sent successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
