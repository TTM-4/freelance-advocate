interface ProposalData {
  projectType: string;
  requirements: string;
  experience: string;
  budget: string;
  timeline: string;
  clientBackground: string;
  proposalStyle: string;
}

export const generateProposal = async (data: ProposalData): Promise<string> => {
  // For now, we'll use a template-based approach
  // In the next step, we'll integrate with an AI service
  const styleMap = {
    professional: "formal and business-like",
    friendly: "warm and approachable",
    technical: "detailed and technical",
    persuasive: "compelling and results-focused",
  };

  const proposal = `Dear [Client Name],

I am writing to express my strong interest in your ${data.projectType} project. With extensive experience in similar projects and a deep understanding of ${data.requirements}, I am confident in my ability to deliver exceptional results.

Project Understanding:
${data.requirements}

Relevant Experience:
${data.experience}

Timeline: ${data.timeline}
Budget: ${data.budget}

${data.clientBackground ? `Additional Context:\n${data.clientBackground}\n` : ""}

I would love to discuss this project further and answer any questions you may have.

Best regards,
[Your Name]`;

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return proposal;
};