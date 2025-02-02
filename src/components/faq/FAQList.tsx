import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./FAQItem";
import { faqData } from "./faqData";

export const FAQList = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          index={index}
        />
      ))}
    </Accordion>
  );
};