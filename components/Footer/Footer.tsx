import {
  Phone,
  Mail,
  Twitter,
  Youtube,
  Instagram
} from "lucide-react";
import FooterFormWrapper from "./FooterFormWrapper";


export default function Footer() {
  
  return (
    <footer 
      id="contact"
      className="text-white relative w-full bg-[url('https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/images/hero_bg-min.jpg')] bg-cover bg-center bg-no-repeat py-16 md:py-24 px-4 md:px-0 overflow-hidden">

      <div className="max-w-4xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-3xl">
        <FooterFormWrapper />  {/* 👈 NEW wrapper */}
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="mt-10 max-w-6xl mx-auto px-6 relative flex flex-col md:flex-row items-center justify-between gap-10">

        {/* CENTER TEXT */}
        <div className="max-w-lg text-center md:text-left flex-1">
          <p className="text-white text-lg md:text-lg font-playfair leading-snug text-justify max-w-2xl mx-auto md:mx-0">
            Our Landing Page is under construction. Check back soon for updates on
            plot availability & upcoming events. We look forward to welcoming
            you to an exceptional golfing and living experience!
          </p>
        </div>

        {/* RIGHT Golf Ball */}
        <img
          src="https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/logo/hub_logo.png"
          alt="golf ball"
          className="w-24 md:w-28 lg:w-32 animate-float"
        />
      </div>

{/* CONTACT + SOCIAL SECTION */}
<div className="mt-10 w-full flex justify-center">
  <div
    className="
      flex flex-wrap items-center justify-center
      gap-8 md:gap-12
      text-white text-sm md:text-base
    "
  >
    {/* Phone */}
    <a href="tel:+917330640040" className="flex items-center gap-2 hover:opacity-80 transition">
      <Phone className="w-5 h-5" />
      <span>+91 73 3064 0040</span>
    </a>

    {/* Email */}
    <a href="mailto:sales@haldi.golf" className="flex items-center gap-2 hover:opacity-80 transition">
      <Mail className="w-5 h-5" />
      <span>sales@aliensgroup.in</span>
    </a>

    {/* YouTube */}
    <a href="https://www.youtube.com/@AliensHubhyderabad" target="_blank" className="flex items-center gap-2 hover:opacity-80 transition">
      <Youtube className="w-5 h-5" />
      <span>YouTube</span>
    </a>

    {/* Instagram */}
    <a href="https://www.instagram.com/aliens.hub/" target="_blank" className="flex items-center gap-2 hover:opacity-80 transition">
      <Instagram className="w-5 h-5" />
      <span>Instagram</span>
    </a>
  </div>
</div>

{/* COPYRIGHT SECTION */}
<div className="mt-12 px-6 flex justify-center">
  <div
    className="
      max-w-xl w-full 
      bg-white/10 
      backdrop-blur-md
      shadow-lg 
      px-6 py-3 
      rounded-full 
      text-white
    "
  >
    <p className="text-center text-sm md:text-base font-medium">
      © {new Date().getFullYear()} Aliens Hub — All Rights Reserved.
    </p>
  </div>
</div>


    </footer>
  );
}
