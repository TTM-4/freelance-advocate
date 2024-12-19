import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ProposalPro AI
        </Link>
        <div className="space-x-4">
          <Link to="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link to="/generator">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};