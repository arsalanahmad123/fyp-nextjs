import { AIWriterSection } from "@/components/homepage/ai-writer-section";
import { Hero } from "@/components/homepage/hero";
import { Services } from "@/components/homepage/services";

export default function Home() {
  return (
    <>
        <Hero />
        <Services />
        <AIWriterSection />
    </>
  );
}
