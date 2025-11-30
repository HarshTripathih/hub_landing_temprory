"use client";

import HUBForm from "@/components/Forms/hubform";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full px-6 md:px-16 pt-20 text-white
      bg-[url('/hero_bg.jpg')] bg-cover bg-center bg-no-repeat "
    >
      <div className="max-w-4xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Get Enquiry
        </h2>

        <p className="mb-6 text-gray-300">
          Fill out the form and we’ll get back to you within 24 hours.
        </p>

        <HUBForm/>
      </div>
    </section>
  );
}
