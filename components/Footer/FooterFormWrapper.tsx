'use client';

import { useState } from "react";
import FooterFormComponent from "./footerFormComponent";

export default function FooterFormWrapper() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div>
      {/* Hide these after success */}
      {!isSubmitted && (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Get Enquiry
          </h2>

          <p className="mb-6 text-gray-300">
            Fill out the form and we’ll get back to you within 24 hours.
          </p>
        </>
      )}

      {/* Form */}
      <FooterFormComponent onSuccess={() => setIsSubmitted(true)} />
    </div>
  );
}
