
import { Message, AISettings } from "../types";

export const chatWithHiki = async (
  messages: Message[],
  settings: AISettings
): Promise<string> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return settings.language === 'ru' 
      ? "ОШИБКА: API_KEY не найден в переменных окружения." 
      : "ERROR: API_KEY not found in environment variables.";
  }

  const systemPrompt = `Ты — Hiki AI. Твой режим личности: ${settings.personality}. Язык: ${settings.language === 'ru' ? 'Русский' : 'English'}. ${settings.systemInstruction}. Отвечай кратко, мудро и в стиле "пустоты".`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.content
          }))
        ],
        temperature: settings.temperature,
        max_tokens: settings.maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || (settings.language === 'ru' ? "Пустота не ответила." : "The void remained silent.");
  } catch (error) {
    console.error("Hiki AI Q&A Error:", error);
    return settings.language === 'ru' 
      ? "Ошибка связи с Пустотой. Проверьте соединение и ключ API." 
      : "Connection to the void lost. Check your API key.";
  }
};
