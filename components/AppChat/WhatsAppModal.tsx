"use client";

import { useState, useMemo } from "react";
import { countryCodes } from "@/utils/countryCodes";
import { pushGTMEvent } from "@/utmTracker/gtm";
import { handleWhatsAppSession } from "@/utils/whatsappSession";

interface Props {
  waPhone: string; // phone coming from layout
  message: string;
  onClose: () => void;
}

export default function WhatsAppModal({
  waPhone,
  message,
  onClose,
}: Props) {
  const [countryCode, setCountryCode] = useState("+91 / India");
  const [phone, setPhone] = useState("");

  // ✅ strict validation
  const isValid = useMemo(() => {
    return countryCode !== "" && phone.length >= 10;
  }, [countryCode, phone]);

  const handleSubmit = async () => {
    if (!isValid) return;

    // 🔹 GTM fires ONLY after valid submit
    pushGTMEvent({
      event: "wpGlobalClick",
      location: "WhatsApp Modal Submit",
    });

    // 🔹 Backend POST
    await handleWhatsAppSession({
      countryCode,
      phone,
    });

    // 🔹 Redirect (existing behaviour)
    const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center px-4">
      <div className="bg-green-500  rounded-xl w-full max-w-md p-6 relative">
        <button
        onClick={onClose}
        className="
            absolute top-3 right-3
            w-8 h-8
            flex items-center justify-center
            text-white
            border-2 border-white
            rounded-full
            hover:bg-white/20
            transition
            cursor-pointer
        "
        >
        ✕
        </button>

        <h3 className="text-lg text-white font-semibold mb-4">
          Continue on WhatsApp
        </h3>

        <div className="flex gap-3 mb-4">
          <div className="relative w-24">
            {/* Visible selected value */}
            <div
              className="
                absolute inset-0
                pointer-events-none
                flex items-center justify-center
                text-white font-medium
              "
            >
              {countryCode || "Code"}
            </div>

            {/* Actual select */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="
                appearance-none
                bg-transparent
                border-2 border-white
                text-transparent
                rounded-md
                px-3 py-2
                w-full
                cursor-pointer
              "
            >
              <option value="">Country</option>
              {countryCodes.map((c) => (
                <option key={c.code + c.label} value={c.value}>
                  {c.value}
                </option>
              ))}
            </select>
          </div>

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
            className="border-2 border-white text-white rounded-md px-3 py-2 flex-1 min-w-32"
          />
        </div>

        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className={`
            w-full py-2 rounded-md transition
            ${
              isValid
                ? "bg-green-900 text-white hover:bg-green-700"
                : "border-2 border-white text-white cursor-not-allowed"
            }
          `}
        >
          Continue to WhatsApp
        </button>
      </div>
    </div>
  );
}
