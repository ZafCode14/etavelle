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
  title: "Etavelle | High-Performance, SEO-Optimized Websites That Convert",
  description: "We build lightning-fast, SEO-optimized websites that rank higher, convert better, and grow with your brand — powered by Next.js.",
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
      <body className={mulish.className} suppressHydrationWarning>
        <Header />
        {children}
        <Chat />
        <Footer />
      </body>
    </html>
  );
}