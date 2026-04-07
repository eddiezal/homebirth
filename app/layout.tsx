import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  openGraph: {
    type: "website",
    siteName: "Homebirth.com",
    title: "Homebirth.com — Find Your Homebirth Provider Match",
    description:
      "Connect with vetted midwives and doulas who match your preferences. Guided intake, explainable matching, and transparent provider profiles.",
    url: "https://homebirth.com",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QR9C7125CH"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QR9C7125CH');`}
        </Script>
      </head>
      <body className={`${fraunces.variable} ${nunito.variable} antialiased`}>{children}</body>
    </html>
  );
}
