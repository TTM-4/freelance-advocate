import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ProposalPreviewProps {
  showPreview: boolean;
  generatedProposal: string;
  setShowPreview: (show: boolean) => void;
}

export const ProposalPreview = ({
  showPreview,
  generatedProposal,
  setShowPreview,
}: ProposalPreviewProps) => {
  const { toast } = useToast();

  if (!showPreview) return null;

  return (
    <Card className="sticky top-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Generated Proposal</h3>
        <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
          {generatedProposal}
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => {
              toast({
                title: "Copied!",
                description: "Proposal copied to clipboard",
              });
              navigator.clipboard.writeText(generatedProposal);
            }}
          >
            Copy to Clipboard
          </Button>
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            Hide Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};