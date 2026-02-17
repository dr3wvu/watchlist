import nodemailer from "nodemailer";
import {
  WELCOME_EMAIL_TEMPLATE,
  NEWS_SUMMARY_EMAIL_TEMPLATE,
} from "./templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
  tls: { rejectUnauthorized: false },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro,
  );

  try {
    await transporter.verify();
    console.log("SMTP ready");
  } catch (err) {
    console.error("SMTP error", err);
  }

  const mailOptions = {
    from: `"Watchlist" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Welcome to Watchlist - your stock market app is ready",
    text: "Thanks for joining",
    html: htmlTemplate,
  };

  console.log("email sent");

  await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: any) => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace(
    "{{date}}",
    date,
  ).replace("{{newsContent}}", newsContent);

  const mailOptions = {
    from: `"Watchlist news" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: `Market News Summary Today - ${date}`,
    text: "Todays market news from Watchlist",
    html: htmlTemplate,
  };

  console.log("email sent");

  await transporter.sendMail(mailOptions);
};
