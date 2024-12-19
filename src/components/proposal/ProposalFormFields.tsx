import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProposalFormFieldsProps {
  formData: {
    projectType: string;
    requirements: string;
    experience: string;
    budget: string;
    timeline: string;
    clientBackground: string;
    proposalStyle: string;
  };
  setFormData: (data: any) => void;
}

export const ProposalFormFields = ({ formData, setFormData }: ProposalFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};