<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fullstack Vibe Map (面向后端工程师的全栈地图)

这是一个为后端工程师量身定制的前端技术栈演进地图。通过后端逻辑类比，帮助开发者快速理解现代前端生态。

### 🌟 核心特性
- **AI 扫盲**: 集成 Gemini API，实时解析陌生的前端名词。
- **类比学习**: 将 React 类比为渲染引擎，Tailwind 类比为 StringUtils，用后端思维消解前端焦虑。
- **极简部署**: 基于 Vite + React + Tailwind CSS。

### 🚀 本地运行

**前置条件:** 已安装 Node.js 和 pnpm

1. **安装依赖**:
   ```bash
   pnpm install
   ```

2. **配置环境**:
   在 `.env.local` 中配置以下环境变量:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **启动开发服务器**:
   ```bash
   pnpm run dev
   ```

4. **访问应用**:
   打开 [http://localhost:3000](http://localhost:3000)

### 🛠 技术栈
- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 6
- **AI**: Google Generative AI (Gemini)

