import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import WhatsAppSession from "@/models/WhatsAppSession";

export async function POST(req: Request) {
  await dbConnect();

  const {
    userId,
    countryCode,
    phone,
    selectproject,
    utmParams,
    outbrainParams,
    utmWebContext,
  } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId missing" }, { status: 400 });
  }

  const existing = await WhatsAppSession.findOne({ userId });

  if (!existing) {
    // ✅ First click → store attribution
    await WhatsAppSession.create({
      userId,
      countryCode,
      phone,
      selectproject,
      clickCount: 1,
      utmParams,
      outbrainParams,
      utmWebContext,
    });
  } else {
    // ✅ Repeat click → increment only
    await WhatsAppSession.updateOne(
      { userId },
      {
        $inc: { clickCount: 1 },
        $set: { lastClickedAt: new Date() },
      }
    );
  }

  return NextResponse.json({ success: true });
}