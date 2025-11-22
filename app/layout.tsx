import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Etavelle | High-Performance, SEO-Optimized Websites That Convert",
  description:
    "We build lightning-fast, SEO-optimized websites that rank higher, convert better, and grow with your brand — powered by Next.js.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Etavelle | High-Performance, SEO-Optimized Websites That Convert",
    description:
      "We build lightning-fast, SEO-optimized websites that rank higher, convert better, and grow with your brand — powered by Next.js.",
    url: "https://www.etavelle.com",
    siteName: "Etavelle",
    images: [
      {
        url: "https://www.etavelle.com/images/ogHome.jpg",
        width: 1200,
        height: 630,
        alt: "Etavelle - High-Performance Websites",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mulish.className} suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <Toaster />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XZ4S3WCB71"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XZ4S3WCB71');
          `}
        </Script>
      </body>
    </html>
  );
}