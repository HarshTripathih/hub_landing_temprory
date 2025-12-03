"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-6 left-0 z-50 flex justify-center">
      <div
        className="
          w-[95%] max-w-5xl 
          bg-white/20 
          backdrop-blur-xl 
          shadow-lg
          rounded-full 
          px-4 md:px-10 py-2 md:py-4
          flex items-center justify-between
          text-black
        "
      >
        {/* LEFT LOGO */}
        <div className="flex items-center gap-8 text-sm">
          <Link href="/">
            <Image 
              src="https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/logo/hub_logo.png"
              alt="Logo"
              width={60}
              height={40}
              className="object-contain w-10 h-auto md:w-[60px]"
            />
          </Link>
        </div>

        {/* RIGHT MENU (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="#contact"
            className="bg-black text-white text-lg px-5 py-4 rounded-full font-medium shadow hover:bg-gray-900 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="text-white" size={32} /> : <Menu className="text-white" size={32} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            absolute top-20 
            w-[90%] max-w-5xl 
            bg-white/10 
            backdrop-blur-xl 
            border border-white/10
            rounded-2xl 
            p-6 
            text-black
            shadow-xl
            flex flex-col gap-5
            md:hidden
          "
        >
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-black text-white px-5 py-2 rounded-full text-center font-medium shadow"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
