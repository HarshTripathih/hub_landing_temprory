// utils/countryCodes.ts
export interface countryCode {
  code: string;
  value: string;
  label: string;
}

export const countryCodes: countryCode[] = [
  { code: "+61", value: "+61 / Australia", label: "Australia" },
  { code: "+973", value: "+973 / Bahrain", label: "Bahrain" },
  { code: "+91", value: "+91 / India", label: "India" },
  { code: "+968", value: "+968 / Oman", label: "Oman" },
  { code: "+974", value: "+974 / Qatar", label: "Qatar" },
  { code: "+966", value: "+966 / Saudi Arabia", label: "Saudi Arabia" },
  { code: "+971", value: "+971 / United Arab Emirates", label: "United Arab Emirates" },
  { code: "+965", value: "+965 / Kuwait", label: "Kuwait" },
  { code: "+1", value: "+1 / United States", label: "United States" },
  { code: "+44", value: "+44 / United Kingdom", label: "United Kingdom" },
  { code: "+1", value: "+1 / Canada", label: "Canada" },
  { code: "+49", value: "+49 / Germany", label: "Germany" },
  { code: "+33", value: "+33 / France", label: "France" },
];

