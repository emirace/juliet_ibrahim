import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

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
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SERVICE,
      port: parseInt(process.env.PORT || "465", 10),
      secure: true,
      //   secureConnection: false,
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

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.RECEIVER,
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
