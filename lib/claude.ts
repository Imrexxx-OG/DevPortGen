import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// TEMPORARY MOCK - replace with real API when you add credits
const USE_MOCK = true;

export async function generateBio(data: {
  name: string;
  skills: string[];
  projectTitles: string[];
  isWeb3: boolean;
}): Promise<string> {
  if (USE_MOCK) {
    return `I'm ${data.name}, a ${data.isWeb3 ? "Web3-focused " : ""}full-stack developer specializing in ${data.skills.slice(0, 3).join(", ")}. I've built projects like ${data.projectTitles.slice(0, 2).join(" and ")}, focusing on creating scalable, user-friendly applications. Passionate about clean code and solving real-world problems with technology.`;
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 250,
    messages: [
      {
        role: "user",
        content: `Write a professional bio for a developer portfolio.
Name: ${data.name}
Skills: ${data.skills.join(", ")}
Projects: ${data.projectTitles.join(", ")}
Web3 developer: ${data.isWeb3 ? "Yes" : "No"}

Rules: 
- 3-4 sentences
- First person
- Confident but not arrogant
${data.isWeb3 ? "- Mention Web3/blockchain experience naturally" : ""}
- Return ONLY the bio text, nothing else`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === "text");
  return textContent && "text" in textContent ? textContent.text : "";
}

export async function generateProjectDescription(data: {
  repoName: string;
  description?: string;
  languages: string[];
  stars: number;
}): Promise<string> {
  if (USE_MOCK) {
    return `${data.repoName} is a ${data.languages.join("/")} application${data.description ? `: ${data.description}` : ""}. Built with modern best practices and deployed for production use${data.stars > 0 ? `, earning ${data.stars} GitHub stars` : ""}.`;
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Write a 2-3 sentence professional portfolio description for this project.
Project: ${data.repoName}
GitHub description: ${data.description || "None"}
Languages: ${data.languages.join(", ")}
Stars: ${data.stars}

Rules: 
- Be specific
- Use active voice
- Mention the tech
- Sound impressive but honest
- Return ONLY the description, no intro, no quotes`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === "text");
  return textContent && "text" in textContent ? textContent.text : "";
}