import { GoogleGenAI, Type } from "@google/genai";
import { TechItem, TechCategory } from "../types";

/**
 * 使用 Gemini AI 生成技术名词的解析
 * 该函数采用“后端思维”来拆解前端技术，帮助后端开发者快速上手
 * @param techName 技术名称 (如: React, Tailwind, Vite)
 */
export async function generateTechExplanation(techName: string): Promise<TechItem | null> {
  // 从环境变量中获取 API KEY，支持 process.env.API_KEY 或 process.env.GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("未找到 GEMINI_API_KEY 环境变量");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  // 构建提示词：要求 AI 以资深后端架构师的角度进行解析
  const prompt = `
    你是一位精通全栈的资深架构师。请向一位“资深后端工程师”解释前端/全栈技术名词 "${techName}"。
    请遵循以下核心原则：
    1. **后端类比**：用后端熟悉的概念（如 Spring, MyBatis, StringUtils, 渲染引擎等）进行类比说明。
    2. **演进逻辑**：清晰描述其诞生的痛点、之前在用什么（前身）、以及目前的地位或后继技术。
    3. **图标原则**：
       - 如果是知名技术，请务必提供其官方 Logo 的直接 URL 链接 (优先使用 SVG 或透明背景的 PNG)。
       - 如果找不到可靠的官方图片链接，则使用一个最能代表该技术的单个 Emoji 表情。
    4. **分类限制**：必须属于以下分类之一：应用框架, 样式与UI, 数据与状态, 部署与基建, 构建工具, API与通讯。
    5. **语言要求**：所有内容必须使用中文。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // 使用更稳定的模型版本
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "生成一个唯一的 ID (如小写名称)" },
            name: { type: Type.STRING, description: "技术名称" },
            category: {
              type: Type.STRING,
              description: "所属分类，必须是：应用框架, 样式与UI, 数据与状态, 部署与基建, 构建工具, API与通讯"
            },
            coordinate: { type: Type.STRING, description: "在全栈地图中的坐标描述 (如: 视图层/渲染引擎)" },
            analogy: { type: Type.STRING, description: "对应的后端概念类比 (如: React 是前端的 Thymeleaf/Velocity)" },
            problem: { type: Type.STRING, description: "要解决的核心痛点" },
            predecessor: { type: Type.STRING, description: "在这之前大家用什么解决这个问题" },
            successor: { type: Type.STRING, description: "目前的行业地位或后继进阶方案" },
            explanation: { type: Type.STRING, description: "一句话核心定义" },
            story: { type: Type.STRING, description: "详细的演进故事和技术内幕" },
            icon: { type: Type.STRING, description: "官方 Logo URL 或代表性的单个 Emoji" }
          },
          required: ["id", "name", "category", "coordinate", "analogy", "problem", "predecessor", "successor", "explanation", "story", "icon"]
        }
      }
    });

    const data = JSON.parse(response.text);
    // 强制校验分类合法性
    const validCategories = Object.values(TechCategory);
    if (!validCategories.includes(data.category)) {
      data.category = TechCategory.FRAMEWORK; // 默认 fallback
    }

    return data as TechItem;
  } catch (e) {
    console.error("Gemini AI 解析失败:", e);
    return null;
  }
}
