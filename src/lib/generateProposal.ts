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
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional proposal writer. Generate a ${data.proposalStyle} proposal for a ${data.projectType} project.`
          },
          {
            role: 'user',
            content: `Create a proposal with the following details:
              - Project Requirements: ${data.requirements}
              - My Experience: ${data.experience}
              - Budget: ${data.budget}
              - Timeline: ${data.timeline}
              ${data.clientBackground ? `- Client Background: ${data.clientBackground}` : ''}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate proposal');
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error generating proposal:', error);
    throw new Error('Failed to generate proposal. Please try again.');
  }
};