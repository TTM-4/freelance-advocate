import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Pricing;