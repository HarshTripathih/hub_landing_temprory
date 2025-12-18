'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Section {
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    title: '1. Introduction',
    content: (
      <p>
        Aliens Hub (“we”, “our”, “us”) respects your privacy and is committed
        to safeguarding any personal information you share through our
        digital forms, or other communication channels. This Privacy Policy
        outlines how we collect, use, and protect your information.
      </p>
    ),
  },
  {
    title: '2. Information We Collect',
    content: (
      <div>
        <p>We collect only the details necessary to respond to your inquiries or provide updates about our project. This may include:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Name</li>
          <li>Contact number</li>
          <li>Email address</li>
          <li>Location and project preferences</li>
          <li>Customer Profile</li>
        </ul>
        <p className="mt-3">
          We do not collect or store any financial or payment information, such
          as bank account, card, or UPI details.
        </p>
      </div>
    ),
  },
  {
    title: '3. Use of Information',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Respond to property inquiries and service requests</li>
        <li>Share project information, offers, or updates (only with your consent)</li>
        <li>Enhance your communication experience with us</li>
      </ul>
    ),
  },
  {
    title: '4. Information Sharing',
    content: (
      <p>
        We do not share, sell, rent, or disclose your personal information to
        any third party. Your data remains strictly within Aliens Hub and its
        authorized internal systems, unless disclosure is required by law or
        governmental authorities.
      </p>
    ),
  },
  {
    title: '5. Data Protection and Retention',
    content: (
      <p>
        We apply appropriate administrative, technical, and physical safeguards
        to protect your information from unauthorized access, alteration, or
        misuse. Your data is retained only for as long as necessary to fulfill
        the purpose for which it was collected, after which it is securely
        deleted.
      </p>
    ),
  },
  {
    title: '6. Your Rights and Choices',
    content: (
      <div>
        <p>
          You have full control over your personal information shared with us.
          If you wish to review, update, or request removal of your details from
          our communication records, you can do so by reaching out through our
          official contact page at{' '}
          <Link
            href="https://www.alienshubproject.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            https://www.alienshubproject.com/
          </Link>.
        </p>
        <p className="mt-3">
          We respect your decision to unsubscribe from promotional or
          project-related communications at any time, and your request will be
          processed promptly and fully.
        </p>
      </div>
    ),
  },
  {
    title: '7. Policy Updates',
    content: (
      <p>
        This Privacy Policy may be revised periodically to reflect regulatory
        updates or process improvements. The latest version will always be
        available on our website. Continued use of our services constitutes
        acceptance of the revised policy.
      </p>
    ),
  },
  {
    title: '8. Contact Us',
    content: (
      <p>
        For any privacy-related concerns or clarifications, please visit our
        official contact page:{' '}
        <Link
          href="https://www.alienshubproject.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          https://www.alienshubproject.com/
        </Link>
      </p>
    ),
  },
];

const PrivacyPolicyPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div>   
    <main className="min-h-screen px-4 sm:px-6 lg:px-16 py-16 text-gray-800
        bg-[url('https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/images/hero_bg-min.jpg')]
        bg-cover bg-center bg-no-repeat
        ">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/80 mb-10 text-center">
          Aliens Group – Privacy Policy
        </h1>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border border-gray-50  bg-black/10 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg sm:text-xl font-semibold text-white/70 focus:outline-none"
              >
                {section.title}
                <span className="ml-4 text-white/70">
                  {activeIndex === index ? <Minus size={22} /> : <Plus size={22} />}
                </span>
              </button>

              {/* Expandable Content */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-white/80 text-base sm:text-lg leading-relaxed">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
    </div>
  );
};

export default PrivacyPolicyPage;

