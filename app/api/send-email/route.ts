import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Etavelle" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}