"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

type Props = {
  email: string;
  name: string;
};

export default function EmailSend({ name }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    const htmlMessage = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Etavelle Outreach Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }
      table {
        border-spacing: 0;
      }
      a {
        color: inherit;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 5px;">
    <table style="width: 600px; max-width: 100%; margin: auto; padding: 20px; border: 1px solid #eee; background-color: #ffffff;">
      <tr>
        <td style="text-align: right;">
          <img src="https://www.etavelle.com/icons/logo.png" alt="Etavelle logo" style="width: 50px; margin-bottom: 30px;" />
        </td>
      </tr>
      <tr>
        <td>
          <h2 style="color: #111; margin-top: 0;">Hi team at ${name},</h2>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            I'm Misha, founder of <strong>Etavelle</strong>, where we build ultra-fast, SEO-optimized websites using <strong>Next.js</strong>.
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Are you open to exploring a custom, high-performance, SEO-optimized web experience for your clients?
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            I’d be happy to chat if that’s something you're interested in. Let me know if you'd be open to a short call — no strings, just value.
          </p>

          <div style="text-align: center;">
            <a href="https://etavelle.com" style="
              background-color: #1f7983;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              display: inline-block;
              margin-top: 20px;
              border-radius: 5px;
            ">Visit Etavelle</a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="font-size: 14px; color: #aaa; margin-top: 30px;">
            Misha Elzaafarani<br />
            Founder, Etavelle<br />
            <a href="mailto:misha@etavelle.com" style="color: #aaa;">misha@etavelle.com</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "zafarwp14@gmail.com",
          subject: "Custom Web Development",
          message: htmlMessage,
        }),
      });

      const result = await res.json();
      alert(result.success ? "Email sent!" : "Failed to send.");
    } catch (error) {
      console.error("Email error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center">
          <Image
            src="/icons/logos/email.svg"
            alt="email icon"
            width={0}
            height={0}
            className="w-4 h-4"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="space-y-4" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Send Custom Email</DialogTitle>
        </DialogHeader>
        <Button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}