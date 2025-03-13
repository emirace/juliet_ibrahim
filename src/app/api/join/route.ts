import { sendEmail2 } from "@/utils/sendEmail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const caseDescription = formData.get("message");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cvFile = formData.get("file") as any;

    if (!fullName || !email || !subject || !caseDescription) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const mailOptions = {
      from: `"Her STEAM" <${process.env.STEAM_EMAIL_USER}>`,
      to: process.env.STEAM_EMAIL_USER!,
      subject: `Join Movement - ${subject}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${caseDescription}`,
      attachments: cvFile
        ? [
            {
              filename: cvFile.filename,
              content: cvFile.content,
              encoding: "base64",
            },
          ]
        : [],
    };

    await sendEmail2(mailOptions);

    return new Response(
      JSON.stringify({ message: "Your request has been sent successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
