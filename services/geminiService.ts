
import { GoogleGenAI } from "@google/genai";
import { PageData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const contentCache = new Map<string, string>();

const getBasePrompt = (pageData: PageData, language: 'en' | 'te'): string => {
    const langName = language === 'en' ? 'English' : 'Telugu';
    
    let prompt = `Act as a financial literacy educator for an Indian audience. Your tone should be simple, encouraging, and clear. Do not provide any financial advice or recommendations. All content is for educational purposes only.

Generate content for a webpage on the topic: "${pageData.title.en}" (in Telugu: "${pageData.title.te}").

The output should be in ${langName} only.

The content should be well-structured. Use Markdown for formatting. Include headings, lists, and bold text to improve readability.
- Start with a simple introduction.
- Explain the core concepts clearly.
- Provide examples where applicable.
- Conclude with a summary.

IMPORTANT: End the entire response with a disclaimer: "Disclaimer: This content is for educational purposes only and not financial advice."
`;

    if (pageData.type === 'COMPARISON') {
        prompt += `
Since this is a comparison page, please create a comparison table using Markdown. Compare the two topics based on key factors like 'Risk', 'Returns', 'Taxation', 'Liquidity', etc. Then, provide a summary of who each option might be suitable for.
`;
    }

    return prompt;
};

export const generateContent = async (pageData: PageData, language: 'en' | 'te'): Promise<string> => {
  const cacheKey = `${pageData.path}-${language}`;
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  if (!API_KEY) {
    return Promise.resolve("API Key not configured. Please check your environment variables.");
  }
  
  try {
    const prompt = getBasePrompt(pageData, language);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const content = response.text;
    contentCache.set(cacheKey, content);
    return content;

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    return "An error occurred while generating content. Please try again later.";
  }
};
