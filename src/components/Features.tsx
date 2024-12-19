import { CheckCircle, Clock, Sparkles, Target } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save Time",
    description: "Generate professional proposals in minutes, not hours",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Higher Win Rate",
    description: "Tailored proposals that speak directly to client needs",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI-Powered",
    description: "Leveraging advanced AI to create persuasive content",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Professional",
    description: "Stand out with polished, well-structured proposals",
  },
];

export const Features = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ProposalPro AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-secondary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};