import { Button } from "@/components/ui/button";
import { PricingFeature } from "./PricingFeature";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    features: string[];
    buttonText: string;
    popular: boolean;
    priceAmount: number;
  };
  isLoading: boolean;
  onSubscribe: (plan: any) => void;
}

export const PricingCard = ({ plan, isLoading, onSubscribe }: PricingCardProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (plan.priceAmount === 0) {
      navigate("/generator");  // Changed from "/" to "/generator"
    } else {
      onSubscribe(plan);
    }
  };

  return (
    <div
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
          <PricingFeature key={idx} feature={feature} />
        ))}
      </ul>
      <Button
        className="w-full"
        variant={plan.popular ? "default" : "outline"}
        onClick={handleAction}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : plan.buttonText}
      </Button>
    </div>
  );
};