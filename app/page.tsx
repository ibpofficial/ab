import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { RecruiterPreviewSection } from "@/components/landing/RecruiterPreviewSection";
import { TracksSection } from "@/components/landing/TracksSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f3f4f6]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <HowItWorksSection />
        <RecruiterPreviewSection />
        <TracksSection />
      </main>
      <Footer />
    </div>
  );
}
