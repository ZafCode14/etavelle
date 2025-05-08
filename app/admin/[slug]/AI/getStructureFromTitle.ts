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
You are an expert in SEO blog structure and content strategy. 
Given a blog title and theme, return a detailed, logically ordered H2 structure to guide the article's content.

Each H2 should:
- Be SEO-friendly and written in natural, clear language
- Flow logically from one section to the next
- Target both readers and search engines with valuable, informative subtopics
- Avoid vague or generic phrasing
- Be tailored to the intent and audience described in the blog theme
- Include brief bullet points (1–3) under each H2 explaining what it should cover

Only return the H2 structure. Do not write full content unless asked.
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
    return parsed.headings;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}