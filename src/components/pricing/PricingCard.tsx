import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
import { Loader2 } from "lucide-react";

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
  onSubscribe: (plan: PricingCardProps['plan']) => Promise<void>;
}

export const PricingCard = ({
  plan,
  isLoading,
  onSubscribe,
}: PricingCardProps) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

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
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="h-5 w-5 text-primary flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">{feature}</span>
          </li>
        ))}
      </ul>
      {plan.name === "Pro" ? (
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogTrigger asChild>
            <Button
              className="mt-8 w-full"
              variant={plan.popular ? "default" : "outline"}
              disabled={isLoading}
              onClick={() => onSubscribe(plan)}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {plan.buttonText}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your subscription? You'll lose access to Pro features at the end of your billing period.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setShowCancelDialog(false)} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          className="mt-8 w-full"
          variant={plan.popular ? "default" : "outline"}
          onClick={() => onSubscribe(plan)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {plan.buttonText}
        </Button>
      )}
    </div>
  );
};