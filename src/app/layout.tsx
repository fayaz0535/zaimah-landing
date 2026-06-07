import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SITE_URL } from "@/lib/constants";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ZAIMAH TECHNOLOGIES | AI-Driven Software & IT Services — Dubai, UAE",
  description:
    "Dubai-based IT company delivering AI-driven software, SaaS products, IT consulting, web hosting, online training, and digital marketing across the UAE.",
  openGraph: {
    title: "ZAIMAH TECHNOLOGIES | AI-Driven Software & IT Services — Dubai, UAE",
    description:
      "Dubai-based IT company delivering AI-driven software, SaaS products, IT consulting, web hosting, online training, and digital marketing across the UAE.",
    url: SITE_URL,
    siteName: "ZAIMAH TECHNOLOGIES",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAIMAH TECHNOLOGIES | AI-Driven Software & IT Services — Dubai, UAE",
    description:
      "Dubai-based IT company delivering AI-driven software, SaaS products, IT consulting, web hosting, online training, and digital marketing across the UAE.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZAIMAH TECHNOLOGIES",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Dubai-based IT company delivering AI-driven software, SaaS products, IT consulting, web hosting, online training, and digital marketing across the UAE.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "fayaz@zaimahtech.ae",
    contactType: "customer support",
  },
  sameAs: [
    "https://www.linkedin.com/company/zaimah-technologies",
    "https://twitter.com/zaimahtech",
    "https://www.instagram.com/zaimahtech",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT & AI Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Driven Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Products" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & Hosting Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:text-white"
          style={{ background: "#5B5BF6" }}
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
