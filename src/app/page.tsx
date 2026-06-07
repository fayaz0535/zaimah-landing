import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import ClientWidgets from "@/components/ui/ClientWidgets";
import TrustStrip from "@/components/ui/TrustStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Services />
        <Products />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ClientWidgets />
    </>
  );
}
