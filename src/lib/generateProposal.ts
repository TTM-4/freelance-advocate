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
  const { projectType, requirements, experience, budget, timeline, clientBackground, proposalStyle } = data;
  
  let tone = proposalStyle === 'friendly' ? 'I' : 'we';
  
  const proposal = `Dear Valued Client,

${clientBackground ? `Thank you for providing information about your organization. ` : ''}Based on your requirements for the ${projectType} project, ${tone} would like to submit this proposal for your consideration.

Project Understanding:
${requirements}

Relevant Experience:
${experience}

Project Timeline:
${tone} can complete this project within ${timeline}.

Investment:
The proposed budget for this project is ${budget}.

${tone} look${proposalStyle === 'friendly' ? '' : 's'} forward to the opportunity to work together on this project.

Best regards,
Your Name`;

  return proposal;
};