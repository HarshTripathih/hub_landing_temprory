import { Cormorant_Garamond } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";
import { Lato } from "next/font/google";
import { Corinthia } from "next/font/google";
import { Caprasimo } from "next/font/google";
import { Freehand } from "next/font/google";
import { Montserrat } from 'next/font/google';

import localFont from 'next/font/local';

export const bhHanna = localFont({
  src: '../fonts/BM-HANNA.ttf',
  display: 'swap',
  variable: '--font-bh-hanna',
});

export const merriweather = localFont({
  src: '../fonts/merriweather-regular-italic.woff2',
  display: 'swap',
  variable: '--font-merriweather',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const caprasimo = Caprasimo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-caprasimo',
  display: 'swap',
});

export const freehand = Freehand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-freehand',
  display: 'swap',
});

export const corinthia = Corinthia({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-corinthia',
  display: 'swap',
});

export const lato = Lato({
    subsets: ['latin'],
    weight: ['100','300','400','700'],
    variable: '--font-lato',
    display: 'swap'
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// Export all fonts as one object if needed
export const allFontVariables = [
  cormorant.variable,
  lato.variable,
  inter.variable,
  playfair.variable,
  geistSans.variable,
  geistMono.variable,
  corinthia.variable,
  caprasimo.variable,
  freehand.variable,
  bhHanna.variable,
  montserrat.variable,
  merriweather.variable
  // add more here
];