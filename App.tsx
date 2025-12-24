
import React, { useState, useMemo } from 'react';
import { INITIAL_TECH_STACK } from './constants';
import { TechItem, TechCategory, SearchState } from './types';
import DetailModal from './components/DetailModal';
import { generateTechExplanation } from './services/geminiService';

const CATEGORIES = ['全部', ...Object.values(TechCategory)];

const App: React.FC = () => {
  const [techStack, setTechStack] = useState<TechItem[]>(INITIAL_TECH_STACK);
  const [search, setSearch] = useState<SearchState>({ query: '', category: '全部' });
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newTechInput, setNewTechInput] = useState('');

  const filteredStack = useMemo(() => {
    return techStack.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(search.query.toLowerCase()) || 
                           item.explanation.toLowerCase().includes(search.query.toLowerCase());
      const matchesCategory = search.category === '全部' || item.category === search.category;
      return matchesQuery && matchesCategory;
    });
  }, [techStack, search]);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechInput.trim()) return;

    setIsLoading(true);
    try {
      const result = await generateTechExplanation(newTechInput);
      if (result) {
        if (!techStack.find(t => t.name.toLowerCase() === result.name.toLowerCase())) {
          setTechStack(prev => [...prev, result]);
        }
        setSelectedTech(result);
        setNewTechInput('');
      }
    } catch (err) {
      alert("AI 暂时无法解析该技术名词，请稍后再试。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      {/* Header Section */}
      <header className="mb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide">
          面向后端工程师的全栈开发指南
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
          Fullstack Vibe Map
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          前端技术栈的“地图坐标”：从网页脚本到现代全栈架构，用后端逻辑理解每一波技术浪潮。
        </p>
      </header>

      {/* Control Panel */}
      <div className="sticky top-4 z-40 mb-12 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-xl">
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="搜索技术名词 (如 Next.js, Webpack...)"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={search.query}
              onChange={(e) => setSearch(prev => ({ ...prev, query: e.target.value }))}
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearch(prev => ({ ...prev, category: cat as any }))}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  search.category === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* AI Generator Input */}
        <form onSubmit={handleAskAI} className="flex gap-2 w-full max-w-3xl mx-auto">
          <input 
            type="text"
            placeholder="发现新名词？问问 AI (例如: Turbopack, Qwik, Svelte)"
            className="flex-1 bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:bg-zinc-950 outline-none transition-all"
            value={newTechInput}
            onChange={(e) => setNewTechInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-zinc-100 text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              '扫盲'
            )}
          </button>
        </form>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStack.map((tech) => (
          <div 
            key={tech.id}
            onClick={() => setSelectedTech(tech)}
            className="tech-card group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-500 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 px-2 py-1 rounded">
                {tech.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
            <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
              {tech.explanation}
            </p>
            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                {tech.analogy.split(' ')[0]}
              </span>
              <span className="group-hover:text-blue-400 transition-colors">查看演进故事 &rarr;</span>
            </div>
          </div>
        ))}

        {filteredStack.length === 0 && !isLoading && (
          <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-3xl border border-zinc-800 border-dashed">
            <p className="text-zinc-500 mb-4">没有找到相关技术...</p>
            <button 
              onClick={() => setSearch({ query: '', category: '全部' })}
              className="text-blue-500 hover:underline"
            >
              清空筛选
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-zinc-900 text-center text-zinc-600">
        <p className="mb-4">全栈之路，道阻且长，Vibe Coding 助你乘风破浪。</p>
        <div className="flex justify-center gap-6 text-sm">
          <span>&copy; 2024 Vibe Coding Lab</span>
          <span>·</span>
          <span>Powered by Gemini 3.0</span>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedTech && (
        <DetailModal 
          item={selectedTech} 
          onClose={() => setSelectedTech(null)} 
        />
      )}
    </div>
  );
};

export default App;
