
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PricingSection } from "@/components/PricingSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeedbackDialog } from "@/components/FeedbackDialog";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <PricingSection />
      <Footer />
      <FeedbackDialog />
    </div>
  );
};

export default Index;
