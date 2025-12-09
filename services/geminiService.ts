import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini API Client
// Ideally, in a production app, we would handle the lack of an API key more gracefully
// or proxy through a backend. Here we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "Detective Noir", a gritty, 1940s-style private investigator helping students learn English grammar (specifically Oxford Navigate Unit 11). 
Your tone is cynical but helpful. You speak in short, punchy sentences. You use metaphors related to crime, rain, and shadows.

Context:
1. Unit 11.1: Outlaws, The Barefoot Bandit (Colton Harris-Moore), and the "Unreal Past" (3rd Conditional: If + Past Perfect, ... would have + Past Participle).
2. Unit 11.2: Regrets, Social Media mistakes, "Should have / Shouldn't have".
3. Unit 11.3: Polysemy (Words with multiple meanings like 'Bank', 'Fine', 'Match').

Rules:
- If the user asks about grammar, explain it like you're solving a crime.
- If the user asks about the Barefoot Bandit, give the facts but keep the noir persona.
- Always encourage the user to "follow the evidence" (study the rules).
- Keep responses concise (under 100 words).
`;

export const sendMessageToDetective = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Encrypted channel unavailable. (Missing API_KEY)";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || " The signal is fuzzy. I couldn't get that.";
  } catch (error) {
    console.error("Transmission error:", error);
    return "Line dead. The feds must be listening. (API Error)";
  }
};