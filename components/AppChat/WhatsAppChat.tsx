'use client';

import Image from "next/image";
import { pushGTMEvent } from "@/utmTracker/gtm";
import { handleWhatsAppSession } from "@/utils/whatsappSession";

interface WhatsAppChatProps {
  phone: string;
  message?: string;
}

export default function WhatsAppChat({
  phone,
  message = `Hello, I’d like to get more information about Aliens Hub.`,
}: WhatsAppChatProps) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const handleWpClick = () => {
    // 🔹 GTM Tracking
    pushGTMEvent({
      event: "wpGlobalClick",
      location: "Bottom Right Floating CTA",
    });

    // 🔹 Session + UTM tracking (stored internally)
    handleWhatsAppSession();
  };

  return (
    <a
      href={whatsappUrl}
      onClick={handleWpClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-16 md:bottom-5 right-2 md:right-5
        z-[9999]
        w-14 h-14 md:w-20 md:h-20
        rounded-full shadow-xl
        hover:scale-105 transition-transform
      "
    >
      <Image
        src="https://d1b9peg0jj5bry.cloudfront.net/icons/whatsapp.svg"
        alt="WhatsApp Chat"
        fill
        priority
        className="object-contain animate-float"
      />
    </a>
  );
}
