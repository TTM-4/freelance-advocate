import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQHeader } from "@/components/faq/FAQHeader";
import { FAQList } from "@/components/faq/FAQList";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <FAQHeader />
          <FAQList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;