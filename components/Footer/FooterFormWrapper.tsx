'use client';

import { useState } from "react";
import FooterFormComponent from "./footerFormComponent";

export default function FooterFormWrapper() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div>
      {/* Hide these after success */}
      {!isSubmitted && (
        <div className="mt-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Book Your Visit Now
          </h2>

          <p className="mb-6 text-gray-300 text-[12px] md:text-lg">
            Fill out the form and we’ll get back to you within 24 hours.
          </p>
        </div>
      )}

      {/* Form */}
      <FooterFormComponent onSuccess={() => setIsSubmitted(true)} />
    </div>
  );
}
