import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnalyticsListener } from "@/components/AnalyticsListener";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_DEBUG =
  process.env.NEXT_PUBLIC_GA_DEBUG === "1" &&
  process.env.NODE_ENV !== "production";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homebirth.com"),
  title: {
    default: "Homebirth.com — Find Your Homebirth Provider Match",
    template: "%s | Homebirth.com",
  },
  description:
    "Connect with vetted midwives and doulas who match your preferences. Guided intake, explainable matching, and transparent provider profiles.",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Homebirth.com",
    title: "Homebirth.com — Find Your Homebirth Provider Match",
    description:
      "Connect with vetted midwives and doulas who match your preferences. Guided intake, explainable matching, and transparent provider profiles.",
    url: "https://homebirth.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Homebirth.com — Find your homebirth provider match",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homebirth.com — Find Your Homebirth Provider Match",
    description:
      "Connect with vetted midwives and doulas who match your preferences. Guided intake, explainable matching, and transparent provider profiles.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://homebirth.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false${GA_DEBUG ? ",debug_mode:true" : ""}});`}
            </Script>
          </>
        )}
      </head>
      <body className={`${fraunces.variable} ${nunito.variable} antialiased`}>
        {GA_ID && <AnalyticsListener />}
        {children}
      </body>
    </html>
  );
}
