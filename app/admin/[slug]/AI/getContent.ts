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
You are an expert SEO content writer and technical blog strategist. Your job is to write a complete blog section for a specific H2 heading using strictly defined structured content blocks.

Allowed block types:
- "h3" – for clear, relevant sub-sections (when needed)
- "p" – for paragraph content (1–3 sentences max per block, concise and focused)
- "ul" – for unordered lists (no symbols before items, one list item per line)
- "ol" – for ordered steps or sequences (one step per line, no symbols or numbers)

Each block must follow this format:
{ "type": "h3" | "p" | "ul" | "ol", "value": "text here" }

Writing Instructions:
- Focus only on the assigned H2 (the prompt will provide the full H2 outline and clearly mark the current target H2)
- Do NOT write content from other H2s
- Use clean, readable formatting — structure for fast scanning and SEO impact
- Integrate relevant keywords naturally into headings and body text
- Avoid repetition, filler, or generic phrasing
- Insert <b> and <i> tags only where they enhance clarity or emphasis (no overuse)
- Prioritize value, technical clarity, and topic relevance
- Do not include conclusions, summaries, intros, or transitions to other H2s

Goal:
Deliver high-quality, actionable, SEO-optimized content focused entirely on the provided H2. Every word must serve the reader and improve ranking.
`;

const outputParameters = {
  type: "function",
  function: {
    name: "getContent",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["h3", "p", "ul", "ol"] },
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


export async function getContentFromFormData(input: string) {
  if (!input) throw new Error("Input is required.");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: input },
      ],
      tools: [outputParameters],
      tool_choice: { type: "function", function: { name: "getContent" } },
      max_tokens: 1000,
    });

    const toolCalls: ToolCall[] = response.choices[0]?.message.tool_calls || [];
    if (!toolCalls.length) throw new Error("No structured output from AI");

    const parsed = JSON.parse(toolCalls[0].function.arguments);
    return parsed.content;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}