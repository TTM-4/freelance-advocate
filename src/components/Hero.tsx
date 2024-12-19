import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-secondary mb-8">
        <Sparkles className="w-4 h-4 mr-2" />
        AI-Powered Proposal Writing
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Win More Freelance Projects
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Generate professional, persuasive proposals in minutes. Stand out from the competition and increase your chances of landing clients.
      </p>
      <Link to="/generator">
        <Button size="lg" className="inline-flex items-center">
          Create Your First Proposal
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};