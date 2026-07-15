import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import Preview from "../components/landing/Preview";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <Preview />

      <CTA />

      <Footer />
    </div>
  );
}
