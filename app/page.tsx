import { AIWriterSection } from "@/components/homepage/ai-writer-section";
import CTASection from "@/components/homepage/cta";
import FAQSection from "@/components/homepage/faq";
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
        <FAQSection />
        <CTASection />
    </>
  );
}
