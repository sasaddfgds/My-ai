
export type Language = 'en' | 'ru';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export type Personality = 'Aggressive' | 'Friendly' | 'Mysterious' | 'Robotic' | 'Chaos';

export interface AISettings {
  personality: Personality;
  temperature: number;
  maxTokens: number;
  systemInstruction: string;
  language: Language;
}

export interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  color: string;
}
