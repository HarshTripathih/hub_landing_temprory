"use client";

import Image from "next/image";
import { useState } from "react";
import { pushGTMEvent } from "@/utmTracker/gtm";
import { handleWhatsAppSession } from "@/utils/whatsappSession";
import WhatsAppModal from "./WhatsAppModal";

interface WhatsAppChatProps {
  phone: string;
  message?: string;
}

const SESSION_KEY = "userId";

export default function WhatsAppChat({
  phone,
  message = `Hello, I’d like to get more information about Aliens Hub.`,
}: WhatsAppChatProps) {
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    const userId = sessionStorage.getItem(SESSION_KEY);

    // 🔁 Returning user → NO MODAL
    if (userId) {
      pushGTMEvent({
        event: "wpGlobalClick",
        location: "Bottom Right Floating CTA",
      });

      // 🔹 Increment click only
      await handleWhatsAppSession();

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 🆕 First-time user → open modal
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
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
      </button>

      {open && (
        <WhatsAppModal
          waPhone={phone}
          message={message}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
