import { HelpCircle } from "lucide-react";

export const FAQHeader = () => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <HelpCircle className="h-8 w-8 text-primary" />
      <h1 className="text-3xl font-bold text-center">
        Frequently Asked Questions
      </h1>
    </div>
  );
};