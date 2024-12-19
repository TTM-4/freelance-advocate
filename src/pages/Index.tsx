import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PricingSection } from "@/components/PricingSection";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <PricingSection />
    </div>
  );
};

export default Index;