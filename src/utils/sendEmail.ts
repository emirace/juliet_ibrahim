import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const smtpConfig: SMTPTransport.Options = {
  host: process.env.SERVICE,
  port: parseInt(process.env.EMAIL_PORT || "465"),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const smtpConfig2: SMTPTransport.Options = {
  host: process.env.SERVICE,
  port: parseInt(process.env.EMAIL_PORT || "465"),
  auth: {
    user: process.env.STEAM_EMAIL_USER,
    pass: process.env.STEAM_EMAIL_PASS,
  },
};

export const sendEmail = async ({
  to,
  from,
  html,
  subject,
  multiple = true,
}: {
  to: string;
  from: string;
  subject: string;
  html: string;
  multiple?: boolean;
}) => {
  const transporter = nodemailer.createTransport(smtpConfig);
  const mailTo = [to, "julietibrahim@gmail.com"];
  await transporter.sendMail({
    from,
    to: multiple ? mailTo : to,
    subject,
    html,
  });
  console.log("Email sent successfully");
};

export const sendEmail2 = async ({
  to,
  from,
  html,
  subject,
  attachments,
  text,
  replyTo,
  multiple = true,
  throwOnError = false,
}: {
  to: string;
  from: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: { filename: string; content: Buffer }[];
  replyTo?: string;
  /** Defaults to true, which also copies hersteaminitiative@gmail.com. Pass
   *  false when the message is addressed to a member of the public. */
  multiple?: boolean;
  /** Defaults to false, matching the original fire-and-forget behaviour. Pass
   *  true when the caller needs to know the send failed. */
  throwOnError?: boolean;
}) => {
  const transporter = nodemailer.createTransport(smtpConfig2);
  const mailTo = multiple ? [to, "hersteaminitiative@gmail.com"] : to;
  try {
    await transporter.sendMail({
      from,
      to: mailTo,
      subject,
      html,
      text,
      attachments,
      replyTo,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
    if (throwOnError) throw error;
  }
};
