import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "3 proposals per month",
      "Basic templates",
      "Standard editing tools",
      "24-hour support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    features: [
      "Unlimited proposals",
      "Advanced templates",
      "Premium editing tools",
      "Priority support",
      "Custom branding",
      "Proposal analytics",
    ],
    buttonText: "Coming Soon",
    popular: true,
  },
];

export const PricingSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg ${
                plan.popular
                  ? "border-2 border-secondary relative bg-secondary/5"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-lg text-gray-600 font-normal">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                disabled={plan.popular}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};