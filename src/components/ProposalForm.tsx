import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ProposalFormFields } from "./proposal/ProposalFormFields";
import { ProposalPreview } from "./proposal/ProposalPreview";
import { generateProposal } from "@/lib/generateProposal";

export const ProposalForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    requirements: "",
    experience: "",
    budget: "",
    timeline: "",
    clientBackground: "",
    proposalStyle: "professional",
  });

  const [generatedProposal, setGeneratedProposal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const proposal = await generateProposal(formData);
      setGeneratedProposal(proposal);
      setShowPreview(true);
      
      toast({
        title: "Proposal Generated!",
        description: "Your proposal has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProposalFormFields formData={formData} setFormData={setFormData} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Proposal"
          )}
        </Button>
      </form>

      <ProposalPreview
        showPreview={showPreview}
        generatedProposal={generatedProposal}
        setShowPreview={setShowPreview}
      />
    </div>
  );
};