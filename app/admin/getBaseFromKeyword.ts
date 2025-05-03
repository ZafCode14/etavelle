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
You are an expert SEO and content strategist. Given a keyword, return an object with a:
- "slug" (URL-friendly version of the keyword),
- "title" (compelling blog post or page title),
- and "description" (a 1-2 sentence SEO meta description).
Keep it optimized, natural, and engaging for humans and search engines.
`;

const outputParameters = {
  type: "function",
  function: {
    name: "getParams",
    description: "Generate SEO metadata based on a keyword.",
    parameters: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "URL-friendly slug generated from the keyword",
        },
        title: {
          type: "string",
          description: "SEO-friendly, engaging title",
        },
        description: {
          type: "string",
          description: "Meta description summarizing the content",
        },
      },
      required: ["slug", "title", "description"],
    },
  },
} as const;

export async function getBaseFromKeyword(input: string) {
  if (!input) throw new Error("Input is required.");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: input },
      ],
      tools: [outputParameters],
      tool_choice: { type: "function", function: { name: "getParams" } },
      max_tokens: 1000,
    });

    const toolCalls: ToolCall[] = response.choices[0]?.message.tool_calls || [];
    if (!toolCalls.length) throw new Error("No structured output from AI");

    const parsed = JSON.parse(toolCalls[0].function.arguments);
    console.log(parsed);
    return parsed; // { slug: "...", title: "...", description: "..." }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}