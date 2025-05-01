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
You are an expert SEO content writer. Your task is to write a complete blog section based on a single provided h2 heading, using well-structured content blocks.

You will be given:
- A list of all h2 headings in the blog (the overall structure)
- One specific h2 heading to focus on

Your job is to write content **only** for the provided h2 heading. Do **not** repeat or overlap with the content of any other h2s in the structure. Keep the scope tightly focused on the chosen h2 to ensure unique and non-duplicated content across the blog.

Use only these block types:
- "h3" – for sub-sections only when necessary to clarify or organize complex information
- "p" – for clear, concise paragraph text
- "ul" – for unordered lists (e.g., benefits, tips) – separate each item with a new line in the value string
- "ol" – for ordered lists (e.g., step-by-step guides) – separate each item with a new line in the value string

Format each block as:
{
  "type": "h3" | "p" | "ul" | "ol",
  "value": "The content or list item text here"
}

Content guidelines:
- Keep content **focused and concise**. Assume this section is one of several 'h2' blocks in a full blog.
- Only use 'h3' if the content under the current h2 requires clear sub-division.
- Write in a natural, informative tone that is easy to read and SEO-friendly.
- Prioritize clarity, helpfulness, and keyword relevance.
- You may use the <b> and <i> tag in the value string to emphasize key phrases, but only when it genuinely improves clarity or SEO relevance.
- Follow paragraphs with supporting lists when appropriate (bulleted for benefits, numbered for steps).
- Do **not** add a conclusion block or generic wrap-up text.

Return output as a **valid JSON structure** inside a top-level "headings" array. Do not include any free text outside this structure.
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