
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  priceAmount: number;
}

interface PricingCardProps {
  plan: PricingPlan;
  isLoading: boolean;
  onSubscribe: (plan: PricingPlan) => Promise<void>;
}

export const PricingFeatureItem = ({ feature }: { feature: string }) => (
  <li className="flex items-center space-x-2">
    <Check className="h-5 w-5 text-primary flex-shrink-0" />
    <span>{feature}</span>
  </li>
);

export const PricingCard = ({
  plan,
  isLoading,
  onSubscribe,
}: PricingCardProps) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleSubscribe = async () => {
    if (plan.name === "Pro") {
      setShowCancelDialog(true);
    } else {
      await onSubscribe(plan);
    }
  };

  return (
    <div
      className={`rounded-lg p-8 ${
        plan.popular
          ? "border-2 border-primary shadow-lg"
          : "border border-border"
      }`}
    >
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className="mt-4 text-xl font-bold">{plan.price}</p>
      <p className="mt-2 text-muted-foreground">
        {plan.name === "Free" ? "Get started with basic features" : "Access all premium features"}
      </p>
      <ul className="mt-6 space-y-4">
        {plan.features?.map((feature, index) => (
          <PricingFeatureItem key={index} feature={feature} />
        ))}
      </ul>
      {plan.name === "Pro" ? (
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogTrigger asChild>
            <Button
              className="mt-8 w-full"
              variant={plan.popular ? "default" : "outline"}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {plan.buttonText}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Subscription</AlertDialogTitle>
              <AlertDialogDescription>
                You're about to subscribe to our Pro plan for {plan.price}. The payment will be processed in South African Rand (ZAR) via PayFast. The final amount will be calculated using current exchange rates.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onSubscribe(plan)} 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Proceed to Payment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          className="mt-8 w-full"
          variant={plan.popular ? "default" : "outline"}
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {plan.buttonText}
        </Button>
      )}
    </div>
  );
};
