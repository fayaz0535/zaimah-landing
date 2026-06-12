import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ZAIMAH Technologies | AI-Driven Software & IT Services — Dubai, UAE",
  description:
    "Dubai-based AI company — makers of funnl (WhatsApp booking AI for UAE SMEs) and SprintX (autonomous software delivery). SHAMS FZE registered. UAE AI Vision 2031 aligned.",
  keywords: [
    "AI company Dubai",
    "WhatsApp booking AI",
    "funnl",
    "SprintX",
    "SaaS UAE",
    "AI software Dubai",
    "UAE IT company",
    "Dubai software development",
    "WhatsApp automation UAE",
    "appointment booking AI",
    "UAE AI Vision 2031",
    "SHAMS FZE",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "ZAIMAH Technologies | AI-Driven Software & IT Services — Dubai, UAE",
    description:
      "Dubai-based AI company — makers of funnl (WhatsApp booking AI for UAE SMEs) and SprintX (autonomous software delivery). SHAMS FZE registered. UAE AI Vision 2031 aligned.",
    url: SITE_URL,
    siteName: "ZAIMAH Technologies",
    type: "website",
    locale: "en_AE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ZAIMAH Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAIMAH Technologies | AI-Driven Software & IT Services — Dubai, UAE",
    description:
      "Dubai-based AI company — makers of funnl and SprintX. UAE AI Vision 2031 aligned.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZAIMAH Technologies",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Dubai-based AI company building WhatsApp booking AI and autonomous software delivery tools for UAE businesses.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
    addressRegion: "SHAMS FZE",
  },
  founder: {
    "@type": "Person",
    name: "Sheik Fayazuddin",
  },
  sameAs: [
    "https://www.linkedin.com/company/zaimahtech",
    "https://funnl.zaimahtech.ae",
    "https://sprintx.zaimahtech.ae",
    "https://admin.zaimahtech.ae",
  ],
};

const funnlSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "funnl",
  url: "https://funnl.zaimahtech.ae",
  description:
    "AI-powered WhatsApp booking and lead qualification SaaS for UAE SMEs.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "0",
  },
};

const sprintxSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SprintX",
  url: "https://sprintx.zaimahtech.ae",
  description:
    "Autonomous software delivery platform — AI-powered sprint management and project execution.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ZAIMAH Technologies",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  email: "fayaz@zaimahtech.ae",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mohammed Al Rashid" },
      reviewBody:
        "funnl transformed how we handle bookings. Our WhatsApp leads are now automatically qualified and booked — we've seen a 40% increase in confirmed appointments.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Aisha Binti Khalid" },
      reviewBody:
        "The AI consulting from ZAIMAH Technologies helped us map out a digital transformation roadmap that actually made sense for our size and budget.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Carlos Rivera" },
      reviewBody:
        "Their team understood our market. The solution they built wasn't generic — it was built for how real estate works in Dubai.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="theme-color" content="#5B6FD4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(funnlSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sprintxSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:text-white"
          style={{ background: "#5B6FD4" }}
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
