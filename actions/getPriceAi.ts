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
You are a Web Development Price Estimator, skilled in evaluating project requirements to deliver precise and fair cost estimates in USD. Your task is to use the tools to assess the provided project details and generate a clear breakdown of estimated costs for each component, followed by the total price. Be generouse to the developer and designer for the completion time

### **Example Outputs**:  
Completion Time: 14 - 20 days

Design: (5pages * $100) + (10sections - 5pages) * $50 = 100$ + (5 * 50$) = $750
Development: (5pages * $100) + (10sections - 5pages) * $50 = 100$ + (5 * 50$) = $750 

Features:  
    - AI Chatbot: $500  
    - Contact Form with Validation: $100  
    - Image Gallery: $100  
    - Authentication (Sign-up, Login): $200  
    - Admin Dashboard for CRUD operations: $300  
    - E-commerce functionality: $800  
    - Payment Gateway Integration: $300  
    - Blog Management System: $300  
    - Responsive Design Testing: $100  
    Features Total: $2,700  

Total: design + development + features = $4,700

make sure the variable output format passed to the tools are exactly like in the example provided especially the design and development. the total is just the total not a fromula. Make sure you calculate the total correctly
`;

const outputParameters = {
  type: "function",
  function: {
    name: "contactDeveloper",
    parameters: {
      type: "object",
      properties: {
        timeline: { type: "string", description: "timeline in days" },
        design: { type: "string", description: "design price" },
        development: { type: "string", description: "development price" },
        features: {
          type: "array",
          description: "list of features and their prices",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "name of the feature" },
              price: { type: "string", description: "price of the feature" }
            }
          }
        },
        total: { type: "string", description: "total price" }
      },
    },
  },
} as const;

export async function getPrice(
  input: string,
) {
  if (!input) {
    throw new Error("Input is required.");
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 300,
      tools: [outputParameters],
    });

    const toolCalls:ToolCall[] = response.choices[0]?.message.tool_calls || [];
    console.log(toolCalls);

    return toolCalls[0] || "No response received.";
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}