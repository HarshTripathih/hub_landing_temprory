import mongoose, { Schema, Document, models, model, Types } from "mongoose";

/* ---------------------------------------
   WhatsApp Session Interface
---------------------------------------- */
export interface IWhatsAppSession extends Document {
  userId: string;

  clickCount: number;

  // Lead info (admin-filled)
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  selectproject?: string;
  FormSource?: string;

  utmParams?: Record<string, any>;
  outbrainParams?: Record<string, any>;
  utmWebContext?: Record<string, any>;

  firstClickedAt: Date;
  lastClickedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------
   WhatsApp Session Schema
---------------------------------------- */
const WhatsAppSessionSchema = new Schema<IWhatsAppSession>(
  {
    userId: { type: String, required: true, unique: true },

    clickCount: { type: Number, default: 1 },

    // Lead fields
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    countryCode: { type: String },
    selectproject: { type: String },
    FormSource: { type: String, default: "default"},

    utmParams: { type: Object },
    outbrainParams: { type: Object },
    utmWebContext: { type: Object },

    firstClickedAt: { type: Date, default: Date.now },
    lastClickedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

/* ---------------------------------------
   Export Model
---------------------------------------- */
export default models.WhatsAppSession ||
  model<IWhatsAppSession>("WhatsAppSession", WhatsAppSessionSchema);
