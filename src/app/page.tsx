import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIs from "@/components/WhatIs";
import Features from "@/components/Features";
import Screens from "@/components/Screens";
import Support from "@/components/Support";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <Hero />
      <WhatIs />
      <Features />
      <Screens />
      <Support />
      <Footer />
      <BottomNav />
    </div>
  );
}
