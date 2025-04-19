"use server";
import nodemailer from 'nodemailer';

export const sendEmail = async (message: string) => {
  try {
    // Validate the input
    if (!message) {
      throw new Error("Missing message");
    }

    // Configure the mail transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App-specific password
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Message",
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};