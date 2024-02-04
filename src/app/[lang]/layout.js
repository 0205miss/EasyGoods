import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { i18n } from "../../../locale-config";
import {Analytics} from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextUi from "@/components/nextui";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const hind_siliguri = Hind_Siliguri({ 
  weight: ['300','400','500','600','700'],
  subsets: ["latin"] 
});

export const metadata = {
  title: "EasyGoods",
  description: "A project for pi commerce hackathon",
};


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children,params }) {
  return (
    <html lang={params.lang}>
      <body className={hind_siliguri.className}>
        <NextUi>
        {children}
        </NextUi>        
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
}
