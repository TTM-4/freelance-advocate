import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
      // Here we'll simulate the AI response for now
      // In the next step, we'll integrate real AI functionality
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const simulatedProposal = `Dear [Client Name],

I am writing to express my strong interest in your ${formData.projectType} project. With extensive experience in similar projects and a deep understanding of ${formData.requirements}, I am confident in my ability to deliver exceptional results.

Timeline: ${formData.timeline}
Budget: ${formData.budget}

[Previous Experience]
${formData.experience}

I would love to discuss this project further and answer any questions you may have.

Best regards,
[Your Name]`;

      setGeneratedProposal(simulatedProposal);
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
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Type</label>
          <Select
            value={formData.projectType}
            onValueChange={(value) =>
              setFormData({ ...formData, projectType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web Development</SelectItem>
              <SelectItem value="mobile">Mobile Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="writing">Content Writing</SelectItem>
              <SelectItem value="marketing">Digital Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Project Requirements</label>
          <Textarea
            placeholder="Enter the project requirements..."
            value={formData.requirements}
            onChange={(e) =>
              setFormData({ ...formData, requirements: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Relevant Experience</label>
          <Textarea
            placeholder="Describe your relevant experience..."
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Client Background (Optional)</label>
          <Textarea
            placeholder="Add any relevant information about the client..."
            value={formData.clientBackground}
            onChange={(e) =>
              setFormData({ ...formData, clientBackground: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Budget Range</label>
          <Input
            type="text"
            placeholder="e.g., $500-$1000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Project Timeline</label>
          <Input
            type="text"
            placeholder="e.g., 2 weeks"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Proposal Style</label>
          <Select
            value={formData.proposalStyle}
            onValueChange={(value) =>
              setFormData({ ...formData, proposalStyle: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select proposal style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

      <div className={`transition-opacity duration-300 ${showPreview ? 'opacity-100' : 'opacity-0'}`}>
        {showPreview && (
          <Card className="sticky top-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Generated Proposal</h3>
              <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                {generatedProposal}
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => {
                  toast({
                    title: "Copied!",
                    description: "Proposal copied to clipboard",
                  });
                  navigator.clipboard.writeText(generatedProposal);
                }}>
                  Copy to Clipboard
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Hide Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};