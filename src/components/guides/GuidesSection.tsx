'use client';

import React, { useState } from 'react';
import { Guide } from '@/types/game';
import { BookOpen, Clock, Eye, ChevronRight, CheckCircle2, Terminal, User } from 'lucide-react';

interface GuidesSectionProps {
  guides: Guide[];
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ guides }) => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <section id="guides" className="py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Installation & Tuning Guides
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Master emulator configuration, shader caches, and mod installation paths.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-indigo-500/50 cursor-pointer"
            onClick={() => setSelectedGuide(guide)}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                  {guide.difficulty}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {guide.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {guide.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                By {guide.author}
              </span>

              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Reader Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-2xl overflow-y-auto p-6 sm:p-8 relative border border-slate-700">
            <button
              onClick={() => setSelectedGuide(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                {selectedGuide.difficulty} Guide
              </span>
              <span className="text-xs text-slate-400">• {selectedGuide.readTime}</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{selectedGuide.title}</h2>
            <p className="text-xs text-slate-400 mb-6">Published by {selectedGuide.author} for {selectedGuide.gameOrEmulator}</p>

            <div className="space-y-6">
              {selectedGuide.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                  <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.content}</p>
                  {step.codeOrPath && (
                    <div className="mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs font-mono text-indigo-300">
                      <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="truncate">{step.codeOrPath}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
