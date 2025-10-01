import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are a friendly and helpful AI financial assistant for the "Telugu Finance Platform".
Your goal is to answer user questions about financial topics in a simple, easy-to-understand way.
You must adhere to these rules:
1.  **Educational Only**: Provide only educational information.
2.  **No Financial Advice**: You MUST NOT provide any financial, investment, legal, or tax advice. Do not recommend specific products or strategies. Always include a disclaimer if a user asks for advice, reminding them to consult a qualified professional.
3.  **Bilingual**: You can understand and respond in both English and Telugu. If a user asks a question in Telugu, respond in Telugu. If they ask in English, respond in English.
4.  **Context-Aware**: You are an assistant on a financial literacy website. Your answers should be relevant to personal finance in India.
5.  **Simple Language**: Avoid jargon. Explain concepts as if you are talking to a beginner.
6.  **Concise**: Keep your answers relatively short and to the point.
7.  **Formatting**: Use markdown for formatting, like lists and bold text, to make the information clear and readable.
`;

export const startChat = (): Chat => {
    if (!API_KEY) {
        throw new Error("API Key not configured.");
    }
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
    return chat;
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
    if (!API_KEY) {
        return "Sorry, I am currently unavailable as the API key is not configured.";
    }
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
};
