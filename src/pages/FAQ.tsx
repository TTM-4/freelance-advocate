import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is ProposalPro AI?",
      answer: "ProposalPro AI is an intelligent proposal generation tool that helps freelancers and businesses create professional, persuasive proposals quickly using AI technology."
    },
    {
      question: "How does the free plan work?",
      answer: "The free plan allows you to generate up to 3 proposals per month using our basic templates and standard editing tools. It's perfect for trying out our service or for occasional use."
    },
    {
      question: "What's included in the Pro plan?",
      answer: "The Pro plan includes unlimited proposal generation, advanced templates, premium editing tools, priority support, custom branding options, and detailed proposal analytics."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "How do I get support?",
      answer: "Free plan users receive 24-hour support via email, while Pro plan users get priority support with faster response times and dedicated assistance."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;