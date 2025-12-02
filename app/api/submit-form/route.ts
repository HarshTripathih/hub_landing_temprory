// import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import axios from 'axios';
import type { NextRequest } from 'next/server';
import Enquiry from "@/models/Enquiry";
import { dbConnect } from "@/lib/db";


interface UTMParams {
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  utm_remarketing?: string;
  utm_campaign_id?: string;
  utm_audience_id?: string;
  utm_audience_name?: string;
  utm_ad_id?: string;
  utm_ad_name?: string;
}

interface OutbrainParams {
  secondary_source?: string;
}

interface UTMWebContext {
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_content?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  department: string
  selectproject: string;
  utmParams?: UTMParams; // for utm tracking
  outbrainParams?: OutbrainParams; // for outbrain tracking
  utmWebContext?: UTMWebContext;  // for organic website tracking
  formType?: string;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB
    const body: FormData = await request.json();
    const {
      name,
      email,
      phone,
      countryCode,
      selectproject,
      department,
      utmParams = {},
      outbrainParams = {},
      utmWebContext = {},
      formType = 'default',
    } = body;
    // console.log('Received form data:', body); // Debug log

    // Spam check: prevent repeated digits
    if (/(\d)\1{3,}/.test(phone)) {
      return NextResponse.json({ error: 'Spam detected. Please try again.' }, { status: 400 });
    }
    
    // ✅ Validate phone format: must be exactly 10 digits
    // if (!/^\d{10}$/.test(phone)) {
    //   return NextResponse.json(
    //     { error: 'Invalid phone number. It should be 10 digits.' },
    //     { status: 400 }
    //   );
    // }

    // ✅ Check for duplicate by email OR phone
    // const existingEnquiry = await Enquiry.findOne({
    //   $or: [{ email }, { phone }],
    // });

    // if (existingEnquiry) {
    //   return NextResponse.json(
    //     { error: "Duplicate entry. Email or Phone already exists." },
    //     { status: 400 }
    //   );
    // }
    // ✅ Save enquiry into MongoDB
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      countryCode,
      department,
      selectproject,
      utmParams,
      outbrainParams,
      utmWebContext,
      formType,
      leadOwner: "", // can be updated later by admin
      status: {
        qualified: false,
        siteVisit: false,
        sale: false,
      },
    });

    // Nodemailer Transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // or use 'smtp.ethereal.email' for testing
    //   auth: {
    //     user: 'harshtripathih321@gmail.com',
    //     pass: 'mngervlyvggpmqfv',
    //   },
    // });

    // Send Email
    // await transporter.sendMail({
    //   from: '"Aliens Group" <harshtripathih321@gmail.com>',
    //   to: 'harshtripathih321@gmail.com',
    //   subject: 'Aliens Website Enquiry',
    //   html: `
    //     <h3>New Enquiry (${formType})</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Country:</strong> ${countryCode}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Selected Project:</strong> ${selectproject}</p>
    //     <p><strong>Department:</strong> ${department}</p>
    //   `,
    // });

    // Salesforce Fields
    const salesforceFields = new URLSearchParams({
      first_name: name,
      last_name: '-',
      email,
      mobile: phone,
      '00N2x000006dUsf': countryCode, //country code
      '00N2x000003TZ67': selectproject,
      '00N2x000006Pgl1': department,
      retURL: 'https://www.alienshub.co.in/luxury-plots-srisailam-highway-kadthal-hyderabad/',
      '00N2x000003TZ73': utmParams?.utm_medium || utmWebContext?.utm_medium || '',     // ✅ optional chaining
      '00N9C000000No9S': 'Digital',
      '00N2x000003TZ75': utmParams?.utm_term || '',
      '00N2x000003TZ6T': utmParams?.utm_source || utmWebContext?.utm_source || outbrainParams?.secondary_source || 'Hub Landing', //secondary source
      '00N2x000003TZ6f': 'Hub Landing', //tertiory
      '00N2x000003TZ71': utmParams?.utm_campaign || utmWebContext?.utm_campaign || '',
      '00N2x000003TZ74': utmParams?.utm_source || utmWebContext?.utm_source || outbrainParams?.secondary_source || 'Hub Landing', //utm_source secondary source
      '00N2x000003TZ72': utmParams?.utm_content || utmWebContext?.utm_content || '', //utm_content
      '00N2x000006Owm3': 'Paid',
      lead_source: 'Digital',
      '00NOW000003fDsP': utmParams?.utm_remarketing || '',
      '00NOW000004JtuX': utmParams?.utm_campaign_id || '',
      '00NOW000004Jtxl': utmParams?.utm_audience_id || '',
      '00NOW000004Ju2b': utmParams?.utm_audience_name || '',
      '00NOW000004Ju4D': utmParams?.utm_ad_id || '',
      '00NOW000004Ju5p': utmParams?.utm_ad_name || '',
      oid: '00D2x000001fBeR',
      debug: '1',
      debugEmail: '',
    });


    // Submit to Salesforce
    const submiteddata = await axios.post(
      'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
      salesforceFields
    );
    // console.log('Salesforce response:', submiteddata); // Debug log
    // -------------------------------
    // ✅ SET COOKIE HERE
    // -------------------------------
    const response = NextResponse.json({
      message: "Form submitted successfully",
    });

    response.cookies.set("brochure_filled", "yes", {
      httpOnly: false,          // must be readable in browser
      secure: true,             // HTTPS only
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",                // available everywhere
    });

    return response;

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
