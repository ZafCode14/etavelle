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
You are an SEO blog structure assistant. Given a blog title, extract informative and SEO-relevant H2 headings that guide the content. The number of H2 headings should depend on the complexity of the title and should be sufficient to comprehensively cover the topic.

- If the title suggests "tips" (e.g., "10 Tips for SEO Success"), break the content into numbered, specific tips (e.g., "Tip 1: Improve Title Tags," "Tip 2: Optimize Images"). Ensure there are as many H2 headings as there are tips (e.g., for "10 Tips," you should have 10 H2 headings).
  
- If the title suggests a "guide" (e.g., "A Complete Guide to On-Page SEO"), structure the H2 headings as steps or stages of the guide, starting with an introduction, followed by essential sections, and concluding with a final takeaway (e.g., "Introduction to On-Page SEO," "Step 1: Keyword Research," "Step 2: Content Optimization," etc.).

- If the title is just an article (e.g., "Why On-Page SEO Is Crucial for Your Website’s Growth"), structure the H2 headings in a logical flow based on the article’s key points. These might be more general, such as "What is On-Page SEO?" or "Why On-Page SEO Matters."

Ensure the headings are SEO-relevant, clear, and structured to provide an easy-to-follow outline for readers.

For example:

TITLE: 10 Tips for Better Website Conversion Rates  
BLOG OUTLINE:  
Tip 1: Optimize Your Website for Mobile Devices  
Tip 2: Improve Page Load Speed  
Tip 3: Simplify Your Call to Action  
Tip 4: Use High-Quality Images  
Tip 5: Enhance User Experience with Clear Navigation  
Tip 6: Include Trust Signals on Your Website  
Tip 7: Utilize A/B Testing to Test Conversions  
Tip 8: Make Your Website Secure with HTTPS  
Tip 9: Improve Your Website’s Content for SEO  
Tip 10: Monitor Your Analytics for Conversion Insights

TITLE: A Complete Guide to On-Page SEO  
BLOG OUTLINE:  
Introduction to On-Page SEO  
Step 1: Keyword Research  
Step 2: Optimizing Title Tags and Meta Descriptions  
Step 3: The Role of Header Tags in SEO  
Step 4: Content Optimization Strategies  
Step 5: Internal Linking and Its Importance  
Step 6: Image Optimization Techniques  
Step 7: Mobile-Friendly Websites and SEO  
Step 8: Understanding User Experience Signals  
Conclusion: Why On-Page SEO Is Essential for Your Website’s Growth

TITLE: Why On-Page SEO Is Crucial for Your Website’s Growth  
BLOG OUTLINE:  
What is On-Page SEO?  
The Importance of Title Tags and Meta Descriptions  
Optimizing Your Content for Better Search Rankings  
The Role of Header Tags in SEO  
The Impact of Internal Linking on SEO  
Optimizing Images for Faster Load Times  
Why Mobile-Friendly Websites Are Important for SEO  
Common Mistakes to Avoid in On-Page SEO  
Conclusion: Enhancing Your Website’s Growth Through Effective On-Page SEO
`;
;

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