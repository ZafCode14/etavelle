"use server";
import OpenAI from "openai";

type ToolCall = {
  function: {
    name: string;
    arguments: string;
  };
};

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

const SYSTEM_PROMPT = `
You are an SEO blog structure assistant. Given a blog title, extract 5-8 informative and SEO-relevant H2 headings to guide the content.

like this example: 
TITLE: What On-Page SEO Is and Why It’s Crucial for Your Website's Growth
BLOG OUTLINE:
Understanding On-Page SEO
Key Elements of On-Page SEO
The Importance of Title Tags and Meta Descriptions
The Role of Header Tags in SEO
Optimizing Content for Search Engines
The Impact of Internal Linking
Image Optimization Techniques
Mobile-Friendliness and Page Speed
Common On-Page SEO Mistakes to Avoid
Conclusion: Enhancing Your Website’s Growth Through Effective On-Page SEO
`;

const outputParameters = {
  type: "function",
  function: {
    name: "getStructure",
    parameters: {
      type: "object",
      properties: {
        headings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["h2"] },
              value: { type: "string" },
            },
            required: ["type", "value"],
          },
        },
      },
      required: ["headings"],
    },
  },
} as const;


export async function getStructureFromTitle(input: string) {
  if (!input) throw new Error("Input is required.");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: input },
      ],
      tools: [outputParameters],
      tool_choice: { type: "function", function: { name: "getStructure" } },
      max_tokens: 300,
    });

    const toolCalls: ToolCall[] = response.choices[0]?.message.tool_calls || [];
    if (!toolCalls.length) throw new Error("No structured output from AI");

    const parsed = JSON.parse(toolCalls[0].function.arguments);
    console.log("parsed: ", parsed);
    return parsed.headings;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}