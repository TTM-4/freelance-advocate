import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PricingCard } from "./pricing/PricingCard";

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
  const [user, setUser] = useState<any>(null);
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

    if (plan.name === "Free") {
      navigate("/generator");
      return;
    }

    setLoadingPlan(plan.name);

    try {
      // Create payment record in database first
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: plan.priceAmount,
          status: 'pending'
        })
        .select()
        .single();

      if (paymentError) {
        throw paymentError;
      }

      // Then initiate payment process
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          paymentId: payment.id,
          amount: plan.priceAmount,
          returnUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancelled`,
        },
      });

      if (error) throw error;

      if (data?.paymentUrl && data?.paymentData) {
        // Create form and submit to PayFast
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.paymentUrl;

        Object.entries(data.paymentData).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Invalid payment data received');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "There was an error processing your payment. Please try again.",
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
            <PricingCard
              key={plan.name}
              plan={plan}
              isLoading={loadingPlan === plan.name}
              onSubscribe={handlePayment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
