
import { TechItem, TechCategory } from './types';

export const INITIAL_TECH_STACK: TechItem[] = [
  {
    id: 'jquery',
    name: 'jQuery',
    category: TechCategory.FRAMEWORK,
    coordinate: '上古时期的交互引擎',
    analogy: '直接操作内存的汇编语言（对 DOM 而言）',
    problem: '在原生 JS 还是“蛮荒之地”时，不同浏览器的 API 像各地方言一样互不通，且操作 HTML 元素极其繁琐。',
    predecessor: '原生 JavaScript (Vanilla JS)',
    successor: 'React / Vue (组件化时代)',
    explanation: 'jQuery 的核心是 "Write Less, Do More"。它通过 $ 符号统治了 Web 十年，解决的是跨浏览器兼容和 DOM 操作的繁琐。但在数据驱动的今天，它手动维护状态的方式显得捉襟见肘。',
    story: '第零章：旧世界的秩序。那时候还没什么“全栈”，你要改个按钮文字，得先在茫茫文档里找到 ID，然后手动修改。jQuery 就像一把万能瑞士军刀，帮你搞定了那些糟心的浏览器兼容性问题。',
    icon: '📜'
  },
  {
    id: 'react',
    name: 'React',
    category: TechCategory.FRAMEWORK,
    coordinate: '现代前端的基石 (UI 库)',
    analogy: '函数式编程中的 Pure Function',
    problem: '当页面变得复杂，手动修改 DOM 会导致状态与界面不同步（脏数据），开发成本爆炸。',
    predecessor: 'jQuery / Backbone.js',
    successor: 'Next.js (全栈框架)',
    explanation: 'React 引入了“声明式编程”和“虚拟 DOM”。你不再告诉浏览器“怎么改”，而是告诉它“现在是什么样”。它只负责渲染，像后端的渲染引擎。',
    story: '第一章：思维的革命。老师傅说：“不要再去碰那个该死的 DOM 了，把它当成一个状态机。” 你发现代码变得清晰了，UI 只是状态的投影。这就是前端进入“工程化”的起点。',
    icon: '⚛️'
  },
  {
    id: 'webpack',
    name: 'Webpack',
    category: TechCategory.BUILD,
    coordinate: '工业时代的重型工厂',
    analogy: '胖重的 Maven / Ant 构建工具',
    problem: 'JS 越来越多，代码散落在几百个文件里，浏览器加载效率极低，且无法使用最新的语法。',
    predecessor: 'Grunt / Gulp',
    successor: 'Vite / Turbopack',
    explanation: '它是前端的“打包机”，把所有的 JS、图片、CSS 全部揉碎再重组，压缩成浏览器最喜欢的样子。它的配置极其复杂，被称为“Webpack 调优工程师”的噩梦。',
    story: '第二章：重工业基地。你第一次见到几千行的配置文件，惊呆了。Webpack 就像一个巨大的自动化工厂，进场的是乱七八糟的零件，出场的是精密的成品。虽慢，但稳。',
    icon: '🏗️'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: TechCategory.FRAMEWORK,
    coordinate: '全栈航母 (Framework)',
    analogy: 'Spring Boot (开箱即用的全能框架)',
    problem: 'React 只是 UI 库，做不了 SEO（搜索引擎优化），首屏加载慢，且没有标准路由。',
    predecessor: 'CRA (Create React App) + 手写 Express',
    successor: 'Next.js App Router',
    explanation: '它在 React 之上建立了一套“规矩”：约定优于配置。它内置了路由、SSR（服务端渲染）、静态生成。它是目前 Vibe Coding 的首选，因为它是真的全栈。',
    story: '第三章：全栈归来。你问：“我这 React 页面百度搜不到啊？” 老师傅扔给你 Next.js。你会发现，前端和后端的界限模糊了，你可以直接在页面组件里写后端逻辑。',
    icon: '🚀'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: TechCategory.STYLING,
    coordinate: '极致效率的样式方案',
    analogy: 'StringUtils 或者是各种 Inline-style 的高级封装',
    problem: 'CSS 难维护、起名难、文件大，经常改了 A 坏了 B。',
    predecessor: 'Sass / Less / BEM 命名法',
    successor: 'Shadcn/UI (基于 Tailwind 的组件库)',
    explanation: '它是一堆原子化的 CSS 类名。你不再写 style.css，而是直接在 HTML 里拼积木。它是 AI 最喜欢的样式方案，因为它的语境都在标签内。',
    story: '第四章：告别命名地狱。你不用再纠结这个按钮是叫 .btn-primary 还是 .btn-blue 了，直接 flex px-4 py-2 bg-blue-500 搞定。丑，但是真快！',
    icon: '🎨'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: TechCategory.BUILD,
    coordinate: '闪电般的开发构建工具',
    analogy: '热部署（Hot Reload）做到极致的微服务环境',
    problem: '项目大了之后，Webpack 启动要 2 分钟，改一行代码编译要 10 秒。',
    predecessor: 'Webpack / Snowpack',
    successor: 'Rolldown (正在开发中)',
    explanation: '利用浏览器原生的 ES Module 特性。它不打包，直接按需加载。开发体验极佳，保存即生效，让开发效率翻倍。',
    story: '第五章：超音速。你刚按下 Ctrl+S，浏览器就刷好了。你问老师傅：“编译还没开始吗？” 老师傅笑了：“Vite 的字典里没有等待。”',
    icon: '⚡'
  },
  {
    id: 'server-action',
    name: 'Server Action',
    category: TechCategory.API,
    coordinate: '消失的 API 层 (RPC)',
    analogy: 'Spring 的 RMI 或者透明的 RPC 调用',
    problem: '为了给前端传个数据，要写 API Controller、DTO、Axios 调用，还要处理类型同步。',
    predecessor: 'REST API / GraphQL',
    successor: 'End-to-end Type-safe Functions',
    explanation: 'Next.js 提供的黑科技。直接在组件里定义异步函数并标记 "use server"，前端调用它就像调本地函数，它会自动帮你把参数 POST 给服务器。',
    story: '第六章：魔法时刻。你不用写 axios.post 了，直接 action={handleSave}。数据在前后端之间“瞬移”了，类型还是全自动同步的。',
    icon: '🪄'
  },
  {
    id: 'edge-runtime',
    name: 'Edge Functions',
    category: TechCategory.INFRA,
    coordinate: '部署在用户家门口的逻辑',
    analogy: 'CDN + 轻量级 Lambda',
    problem: '服务器在美西，中国用户访问延迟高。中心化部署无法应对全球低延迟需求。',
    predecessor: 'AWS Lambda / 云函数',
    successor: 'Vercel / Cloudflare Workers',
    explanation: '在 CDN 节点上运行的轻量级 JS 环境。没有冷启动时间，在全球上百个城市运行你的逻辑。适合做鉴权、灰度分流和低延迟 API。',
    story: '第七章：瞬间移动。你的逻辑不再死守在某台服务器里，而是像雾一样散布在全球。用户在哪，你的后端就在哪。',
    icon: '🌐'
  }
];
