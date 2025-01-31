import { Check } from "lucide-react";

interface PricingFeatureProps {
  feature: string;
}

export const PricingFeature = ({ feature }: PricingFeatureProps) => {
  return (
    <li className="flex items-center">
      <Check className="w-5 h-5 text-green-500 mr-2" />
      {feature}
    </li>
  );
};