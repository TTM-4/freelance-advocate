import { Navbar } from "@/components/Navbar";
import { ProposalForm } from "@/components/ProposalForm";
import { Footer } from "@/components/Footer";

const Generator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Proposal</h1>
        <ProposalForm />
      </div>
      <Footer />
    </div>
  );
};

export default Generator;