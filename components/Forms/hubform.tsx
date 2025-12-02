"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";

import { Listbox } from "@headlessui/react";
import { countryCodes, countryCode } from "@/utils/countryCodes";
import { ChevronDownIcon } from "lucide-react";
import type { UTMParams, OutbrainParams } from '@/interfaces/marketing.interface';
import { getWithExpiry } from '@/utils/localstorage';
import { CustomButton } from "@/uiComponents/Button";

interface HubBrochureFormProps {
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  selectproject: string;
  phone: string;
  countryCode: string;
}

interface utmWebsiteFormProps {
  utmWebContext?: {
    utm_campaign: string
    utm_medium: string
    utm_content: string
    utm_source: string
  }
}


const HUBForm: React.FC<HubBrochureFormProps & utmWebsiteFormProps> = ({onSuccess, utmWebContext }) => {
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    selectproject: "Aliens Hub",
    phone: "",
    countryCode: "+91 / India",
  });
  const [status, setStatus] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(true);

  // 🔍 filter by code, value, or label
  const filteredCodes =
    query === ""
      ? countryCodes
      : countryCodes.filter(
          (c) =>
            c.code.toLowerCase().includes(query.toLowerCase()) ||
            c.value.toLowerCase().includes(query.toLowerCase()) ||
            c.label.toLowerCase().includes(query.toLowerCase())
        );


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      toast.error("You must agree to receive updates and promotional offers.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const loadingToast = toast.loading("Submitting...");
    setStatus("Submitting...");

    try {
      const payload: any = {
        ...formData,
        formType: "hubForm",
      };

      // ✅ Always read fresh from storage
      const storedUTM = getWithExpiry<UTMParams>("utmParams");
      const storedOutbrain = getWithExpiry<OutbrainParams>("outbrainParams");

      console.log("Stored UTM:", storedUTM);
      console.log("Stored Outbrain:", storedOutbrain);

      // ✅ Priority: UTM → Outbrain → Website fallback
      if (storedUTM && Object.values(storedUTM).some(Boolean)) {
        payload.utmParams = storedUTM;
      } else if (storedOutbrain && storedOutbrain.secondary_source) {
        payload.outbrainParams = storedOutbrain;
      } else if (utmWebContext) {
        payload.utmWebContext = utmWebContext;
      }

      // ✅ API call
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { message?: string; error?: string } = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.update(loadingToast, {
          render: "Submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setStatus("Submitted successfully!");
        setSubmitted(true);

        setFormData({
          name: "",
          email: "",
          selectproject: "Aliens Hub",
          phone: "",
          countryCode: "",
        });
        setConsent(true);

        // ⚡️ Trigger Google Tag Manager event
        try {
          if (typeof window !== "undefined") {
            const uniqueLeadId = 'lead_' + Date.now();
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: 'leadFormSuccess',
              leadId: uniqueLeadId,
              project: formData.selectproject,
              utm_campaign: payload?.utmParams?.utm_campaign || utmWebContext?.utm_campaign,
              utm_source: payload?.utmParams?.utm_source || utmWebContext?.utm_source,
              utm_medium: payload?.utmParams?.utm_medium || utmWebContext?.utm_medium,
              utm_content: payload?.utmParams?.utm_content || utmWebContext?.utm_content,
            });
            console.log("✅ GTM leadFormSuccess event pushed", formData.selectproject);
          } else {
            console.warn("⚠️ GTM not initialized, skipping tracking.");
          }
        } catch (err) {
          console.error("Error pushing GTM event:", err);
        }

        // ✅ Trigger Outbrain conversion safely
        try {
          if (typeof window !== "undefined" && (window as any).obApi) {
            (window as any).obApi("track", "Submit", {
              project: formData.selectproject,
              utm_campaign: payload?.utmParams?.utm_campaign || utmWebContext?.utm_campaign,
              utm_source: payload?.utmParams?.utm_source || utmWebContext?.utm_source,
              utm_medium: payload?.utmParams?.utm_medium || utmWebContext?.utm_medium,
              utm_content: payload?.utmParams?.utm_content || utmWebContext?.utm_content,
            });
            console.log("✅ Outbrain conversion tracked for project:", formData.selectproject);
          } else {
            console.warn("⚠️ Outbrain not initialized, skipping tracking.");
          }
        } catch (err) {
          console.error("Error triggering Outbrain conversion:", err);
        }
     
        // ✅ Optional: clear after success
        // localStorage.removeItem("utmParams");
        // localStorage.removeItem("outbrainParams");
        // setUtmParams({});
        // setOutbrainParams({});
        onSuccess?.();
      } else {
        setStatus(data.error || "Something went wrong.");
      }
      
    } catch (err) {
      toast.update(loadingToast, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setStatus("Server error. Please try again.");
    }
  };


  return (
    <div className="mt-16 mb-10 md:mt-10 md:mb-10 animate-fade-in-up">
      <h3 className="text-[28px] font-regular mb-6 text-center text-white font-cormorant">
        {submitted ? "Thank You!" : "Schedule Your Call Now"}
      </h3>

      <div className="max-w-lg mx-auto w-full">
        {submitted ? (
          <p className="text-center text-white text-lg">
            We have received your response. Our team will reach out to you shortly.
          </p>
        ) : (
          <form className="mt-8 flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              aria-label="Your Name"
              className="w-[90%] bg-transparent border-b border-white outline-none -mt-4 py-2 placeholder-white text-white"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              aria-label="Your Email"
              className="bg-transparent w-[90%] border-b border-white outline-none placeholder-white text-base py-2 text-white"
              required
            />

            <input
              type="hidden"
              name="selectproject"
              value="Aliens Hub"
              readOnly
              aria-label="Selected Project"
              className="w-[90%] bg-transparent border-b border-white outline-none py-2 placeholder-white text-white cursor-not-allowed"
            />
            <div className="w-[90%] bg-transparent border-b border-white py-2 text-white cursor-not-allowed">
              Luxury Golf Villa Hill Township
            </div>


            <div className="flex flex-col sm:flex-row sm:space-x-2 mb-2 w-[90%] max-w-xl">
              {/* Country Code */}
              <Listbox
                value={formData.countryCode}
                onChange={(val) => setFormData((prev) => ({ ...prev, countryCode: val }))}
              >
                <div className="relative w-full sm:w-36">
                  <Listbox.Button className="w-full border-b border-white py-2 px-0 text-left text-white bg-transparent flex items-center justify-between">
                    <span>
                      {countryCodes.find((c) => c.value === formData.countryCode)?.code || 'Select'}
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                  </Listbox.Button>

                  <Listbox.Options className="absolute mt-1 max-h-40 w-full sm:w-72 overflow-auto rounded-md bg-white text-black shadow-lg z-10">
                    <div className="sticky top-0 bg-white px-2 py-1">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                      />
                    </div>

                    {filteredCodes.length === 0 && (
                      <div className="px-4 py-2 text-gray-500">No results found</div>
                    )}

                    {filteredCodes.map((country) => (
                      <Listbox.Option
                        key={country.value}
                        value={country.value}
                        className={({ active }) =>
                          `cursor-pointer px-4 py-2 ${active ? 'bg-gray-200' : 'bg-white'}`
                        }
                      >
                        {country.value}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>

              {/* Phone Input */}
              <div className="relative flex-1 w-full">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  pattern="[0-9]{6,15}"
                  className="w-full bg-transparent placeholder-white border-b border-white outline-none py-2 sm:py-2 text-base text-white"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-[90%] mb-4">
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
                aria-label="Consent to updates and offers"
                className="w-6 h-6 accent-[#d5c9b3]"
              />
              <label className="text-white text-[12px] leading-relaxed">
                Yes, I would like to receive updates and promotional offers from Aliens Group
              </label>
            </div>

            <div className="flex justify-center items-center">
              <CustomButton
                type="submit"
                text="Submit"
                className="text-white border border-white py-3 px-8 rounded-[1px]"
              />
            </div>

            {status && <p className="text-center text-sm mt-2">{status}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default HUBForm;
