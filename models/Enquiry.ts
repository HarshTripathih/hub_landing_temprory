import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  department: string;
  selectproject: string;
  utmParams?: Record<string, any>;
  outbrainParams?: Record<string, any>;
  utmWebContext?: Record<string, any>;
  formType?: string;
  leadOwner?: string; // ✅ manually assignable
  status: {
    qualified: boolean;
    siteVisit: boolean;
    sale: boolean;
  };
  createdAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    countryCode: { type: String },
    department: { type: String },
    selectproject: { type: String, required: true },
    utmParams: { type: Object },
    outbrainParams: { type: Object },
    utmWebContext: { type: Object },
    formType: { type: String, default: "default" },

    // ✅ new fields
    leadOwner: { type: String, default: "" },
    status: {
      qualified: { type: Boolean, default: false },
      siteVisit: { type: Boolean, default: false },
      sale: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default models.Enquiry || model<IEnquiry>("Enquiry", enquirySchema);
