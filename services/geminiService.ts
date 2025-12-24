
import { GoogleGenAI, Type } from "@google/genai";
import { TechItem, TechCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTechExplanation(techName: string): Promise<TechItem | null> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Explain the frontend/fullstack technology "${techName}" to a senior backend engineer using the "Vibe Coding" mindset.
    The response must strictly follow the Chinese tech map logic.
    Categories: 应用框架, 样式与UI, 数据与状态, 部署与基建, 构建工具, API与通讯.
    Include historical context: what problem it solved, what was before, and what is the current trend.
    For the "icon" field, provide either a single emoji OR a high-quality direct SVG/PNG URL of the technology's official logo if available.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          category: { 
            type: Type.STRING, 
            description: "Must be one of the Chinese categories: 应用框架, 样式与UI, 数据与状态, 部署与基建, 构建工具, API与通讯" 
          },
          coordinate: { type: Type.STRING },
          analogy: { type: Type.STRING },
          problem: { type: Type.STRING, description: "诞生背景（解决什么痛点）" },
          predecessor: { type: Type.STRING, description: "前身（之前在用什么）" },
          successor: { type: Type.STRING, description: "后继/现状" },
          explanation: { type: Type.STRING },
          story: { type: Type.STRING },
          icon: { type: Type.STRING, description: "A single emoji or a valid image URL" }
        },
        required: ["id", "name", "category", "coordinate", "analogy", "problem", "predecessor", "successor", "explanation", "story", "icon"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data as TechItem;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
}
