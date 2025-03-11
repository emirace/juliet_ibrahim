import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, subject, caseDescription, cvFile } =
      await req.json();

    if (!fullName || !email || !subject || !caseDescription) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SERVICE,
      secure: true,
      secureConnection: false,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: process.env.PORT,
      debug: true,
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.RECEIVER,
      subject: `Donation - ${subject}`,
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

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Your request has been sent successfully!" }),
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
