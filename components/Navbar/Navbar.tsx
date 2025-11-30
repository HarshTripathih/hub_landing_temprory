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
          bg-black/40 
          backdrop-blur-xl 
          rounded-full 
          px-6 md:px-10 py-4 
          flex items-center justify-between
          text-white
        "
      >
        {/* LEFT SIDE MENU — HIDDEN ON MOBILE */}
        <div className="flex items-center gap-8 text-sm">
          <Link href="/">
            <Image 
              src="https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/logo/hub_logo.png"       // <-- update with your logo path
              alt="Logo"
              width={60}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* CENTER LOGO */}
        {/* <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          ruleoftrees
        </div> */}

        {/* RIGHT SIDE MENU — HIDDEN ON MOBILE */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="#about">About</Link>
          {/* Contact Button */}
          <Link
            href="#contact"
            className="bg-white text-black px-5 py-1.5 rounded-full font-medium shadow"
          >
            Contact
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="
          absolute top-20 
          w-[90%] max-w-5xl 
          bg-black/70 backdrop-blur-xl 
          rounded-2xl 
          p-6 
          text-white 
          flex flex-col gap-5
          md:hidden
        ">
          <Link href="#about" onClick={() => setOpen(false)}>About</Link>
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-5 py-2 rounded-full text-center font-medium shadow"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
