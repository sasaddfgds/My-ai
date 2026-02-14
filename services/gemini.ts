
import { GoogleGenAI } from "@google/genai";
import { AISettings, Message } from "../types";

export const chatWithHiki = async (
  messages: Message[],
  settings: AISettings
): Promise<string> => {
  // Инициализация строго через именованный параметр и процесс.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const lastMessage = messages[messages.length - 1].content;
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage }] }
      ],
      config: {
        systemInstruction: `You are Hiki AI. Personality mode: ${settings.personality}. Language: ${settings.language === 'ru' ? 'Russian' : 'English'}. ${settings.systemInstruction}. Be concise, cryptic, and profound.`,
        temperature: settings.temperature,
      },
    });

    return response.text || (settings.language === 'ru' ? "Пустота не ответила." : "The void remained silent.");
  } catch (error) {
    console.error("Hiki AI Error:", error);
    if (settings.language === 'ru') {
      return "ОШИБКА: Проверьте API ключ в настройках окружения (Vercel/GitHub Environment Variables).";
    }
    return "ERROR: Check API_KEY in your environment variables.";
  }
};
