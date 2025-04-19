import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import Chat from "@/components/Chat";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Etavelle",
  description: "Etavelle offers expert web development services...",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="This is description"/>
      </head>
      <body className={mulish.className} suppressHydrationWarning>
        <Header />
        {children}
        <Chat />
        <Footer />
      </body>
    </html>
  );
}