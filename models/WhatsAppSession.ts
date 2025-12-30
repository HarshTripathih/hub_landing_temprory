import mongoose from "mongoose";

const WhatsAppSessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    clickCount: { type: Number, default: 1 },
    utmParams: { type: Object },
    outbrainParams: { type: Object },
    utmWebContext: { type: Object },
    firstClickedAt: { type: Date, default: Date.now },
    lastClickedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.WhatsAppSession ||
  mongoose.model("WhatsAppSession", WhatsAppSessionSchema);
