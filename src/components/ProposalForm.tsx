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

export const ProposalForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    requirements: "",
    experience: "",
    budget: "",
    timeline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Proposal Generated!",
      description: "Your proposal has been generated successfully.",
    });
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Generating..." : "Generate Proposal"}
      </Button>
    </form>
  );
};