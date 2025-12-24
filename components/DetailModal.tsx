
import React from 'react';
import { TechItem } from '../types';
import IconRenderer from './IconRenderer';

interface DetailModalProps {
  item: TechItem;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-4">
            <IconRenderer 
              icon={item.icon} 
              name={item.name} 
              className="w-14 h-14 text-4xl" 
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">{item.category}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Quick Context Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
              <h3 className="text-xs font-bold text-zinc-500 uppercase mb-2">🗺️ 坐标</h3>
              <p className="text-zinc-200 font-medium">{item.coordinate}</p>
            </div>
            <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-900/30">
              <h3 className="text-xs font-bold text-blue-500/70 uppercase mb-2">🔄 后端类比</h3>
              <p className="text-blue-100 font-medium">{item.analogy}</p>
            </div>
          </div>

          {/* Evolution Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-zinc-600 rounded-full"></span>
              技术演进脉络
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-950/10 border border-red-900/20 p-4 rounded-xl">
                <span className="text-xs font-bold text-red-500 block mb-1">BEFORE (前身)</span>
                <p className="text-zinc-300 text-sm">{item.predecessor}</p>
              </div>
              <div className="bg-green-950/10 border border-green-900/20 p-4 rounded-xl">
                <span className="text-xs font-bold text-green-500 block mb-1">PROBLEM (痛点)</span>
                <p className="text-zinc-300 text-sm">{item.problem}</p>
              </div>
              <div className="bg-purple-950/10 border border-purple-900/20 p-4 rounded-xl">
                <span className="text-xs font-bold text-purple-500 block mb-1">AFTER (后继/现状)</span>
                <p className="text-zinc-300 text-sm">{item.successor}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              通识解释
            </h3>
            <p className="text-zinc-300 leading-relaxed bg-zinc-800/20 p-4 rounded-lg border border-zinc-800">
              {item.explanation}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Vibe Coding 进阶故事
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 italic text-zinc-400 leading-relaxed font-serif text-lg">
                &ldquo;{item.story}&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 text-center text-zinc-500 text-xs">
          Backend to Fullstack Mastery · Vibe Coding Hub
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
