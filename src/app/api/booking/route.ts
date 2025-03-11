import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { category, service, date, time, name, email, phone } =
      await request.json();

    // Validate required fields
    if (!category || !service || !date || !time || !name || !email || !phone) {
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

    // Send email notification
    await transporter.sendMail({
      from: `"Booking System" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER, // Admin/Support email
      subject: `New Booking Request from ${name}`,
      html: bookingTemplate(category, service, date, time, name, email, phone),
    });

    return new Response(
      JSON.stringify({ message: "Booking request sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing booking:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// HTML Email Template for Booking
function bookingTemplate(
  category: string,
  service: string,
  date: string,
  time: string,
  name: string,
  email: string,
  phone: string
) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px;">
      <h2 style="color: #333;">📅 New Booking Request</h2>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 14px; text-align: center; color: #666;">This booking request was submitted from your website.</p>
    </div>
  `;
}
