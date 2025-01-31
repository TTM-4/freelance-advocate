import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    priceAmount: 0,
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
    buttonText: "Subscribe Now",
    popular: true,
    priceAmount: 19,
  },
];

export const PricingSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePayment = async (plan: typeof plans[0]) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setLoadingPlan(plan.name);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: plan.priceAmount,
          returnUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancelled`,
        },
      });

      if (error) throw error;

      // Create a form and submit it to the URL provided by the edge function
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.paymentUrl;
      form.style.display = 'none';

      Object.entries(data.paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
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
                onClick={() => handlePayment(plan)}
                disabled={plan.priceAmount === 0 || loadingPlan === plan.name}
              >
                {loadingPlan === plan.name ? "Processing..." : plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};