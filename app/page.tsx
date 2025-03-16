import { AIWriterSection } from "@/components/homepage/ai-writer-section";
import { Hero } from "@/components/homepage/hero";
import { PowerOfContent } from "@/components/homepage/power-of-content";
import PricingSection from "@/components/homepage/pricing";
import { Services } from "@/components/homepage/services";

export default function Home() {
  return (
    <>
        <Hero />
        <Services />
        <AIWriterSection />
        <PowerOfContent />
        <PricingSection />
    </>
  );
}
