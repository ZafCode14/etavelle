import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import AnimateIn from "./AnimateIn";

export default function Footer() {
  return (
    <footer className="bg-[#F7F7FD] py-10 px-4 md:px-16 flex flex-col items-center rounded-t-3xl">

      <AnimateIn y={100} className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 w-[1200px] max-w-full">

        {/* Brand Intro */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/logo.svg"
              alt="Etavelle Logo"
              width={40}
              height={40}
              className="object-contain w-10 h-10"
            />
            <span className="text-lg font-semibold">Etavelle</span>
          </div>
          <p className="text-sm">
            At Etavelle, we design lightning-fast, SEO-driven websites built to rank higher, convert better, and scale effortlessly.
          </p>
          <div className="flex space-x-2 pt-2">
            {/* Replace with actual social icons */}
            {["/icons/logos/linkedin.svg", "/icons/logos/whatsapp.svg"].map((icon, idx) => (
              <Button key={idx} variant="outline" className="rounded-full w-11 h-11 p-2 border-transparent bg-transparent">
                <Image
                  src={icon}
                  alt="Social Icon"
                  width={32}
                  height={32}
                  className="object-contain hover:opacity-80 transition"
                />
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3">
          <p className="font-semibold mb-1">Company</p>
          <hr className="border border-black w-[100px]" />
          <ul className="space-y-1 text-sm">
              <li>
                <Link href={`#services`} className="hover:underline">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href={`#projects`} className="hover:underline">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href={`#contact`} className="hover:underline">
                  Contact Us
                </Link>
              </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <p className="font-semibold mb-1">Contact Us</p>
          <hr className="border border-black mb-5 w-[100px]" />
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="text-black w-5 h-5"/>
            <span>+2012212378</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="text-black w-5 h-5"/>
            <span>contact@etavelle.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="text-black w-5 h-5"/>
            <span>Egypt, Cairo, Golf Street, 31</span>
          </div>
        </div>
      </AnimateIn>

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs border-t pt-4 gap-2 w-[1200px] max-w-full">
        <p>© 2025 Etavelle. All Rights Reserved.</p>
        <p>Crafted by Etavelle for the digital age.</p>
      </div>
    </footer>
  );
}