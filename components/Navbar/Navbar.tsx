"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
          px-6 md:px-10 py-4 
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
              className="object-contain"
            />
          </Link>
        </div>

        {/* RIGHT MENU (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* <Link href="#about" className="font-bold text-lg text-gray-100 hover:text-black transition">About</Link> */}

          <Link
            href="#contact"
            className="bg-black text-white px-5 py-1.5 rounded-full font-medium shadow hover:bg-gray-900 transition"
          >
            Contact
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            absolute top-20 
            w-[90%] max-w-5xl 
            bg-white/80 
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
          {/* <Link href="#about" onClick={() => setOpen(false)}>About</Link> */}

          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-black text-white px-5 py-2 rounded-full text-center font-medium shadow"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
