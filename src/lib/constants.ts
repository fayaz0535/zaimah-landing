export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaimahtech.ae";

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#about",    label: "About"    },
  { href: "#contact",  label: "Contact"  },
] as const;

export const SERVICES = [
  {
    id: "ai-development",
    title: "AI-Driven Development",
    description: "We design and build custom AI-powered applications tailored to your business logic — from intelligent automation to decision-support systems.",
    accent: "indigo",
    icon: "brain",
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Strategic technology advisory to help businesses modernise infrastructure, optimise processes, and build for scale.",
    accent: "teal",
    icon: "bar-chart",
  },
  {
    id: "saas-products",
    title: "SaaS Products",
    description: "Purpose-built software products solving real problems for UAE businesses — starting with funnl for lead generation and appointment booking.",
    accent: "indigo",
    icon: "laptop",
  },
  {
    id: "web-hosting",
    title: "Web & Hosting Services",
    description: "High-performance web development and managed hosting solutions — secure, scalable, and optimised for the UAE market.",
    accent: "teal",
    icon: "server",
  },
  {
    id: "online-training",
    title: "Online Training",
    description: "Practical, industry-focused technology training programmes for professionals and teams — delivered online at your own pace.",
    accent: "indigo",
    icon: "graduation-cap",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Data-driven digital marketing strategies combining SEO, content, and AI tools to grow your visibility and generate qualified leads.",
    accent: "teal",
    icon: "megaphone",
  },
] as const;

export const ABOUT_STATS = [
  { number: 3, suffix: "+", label: "AI Products Built" },
  { number: 50, suffix: "+", label: "Clients Served" },
  { number: 0,  suffix: "UAE", label: "Based", isText: true },
  { number: 0,  suffix: "24/7", label: "AI Support", isText: true },
] as const;

export const TESTIMONIALS = [
  {
    quote: "funnl transformed how we handle bookings. Our WhatsApp leads are now automatically qualified and booked — we've seen a 40% increase in confirmed appointments.",
    name: "Mohammed Al Rashid",
    role: "CEO, Shave Crave Salon",
  },
  {
    quote: "The AI consulting from ZAIMAH TECHNOLOGIES helped us map out a digital transformation roadmap that actually made sense for our size and budget.",
    name: "Aisha Binti Khalid",
    role: "Director, Dubai Wellness Clinic",
  },
  {
    quote: "Their team understood our market. The solution they built wasn't generic — it was built for how real estate works in Dubai.",
    name: "Carlos Rivera",
    role: "Manager, Sunset Real Estate",
  },
] as const;
