'use client';

import React, { useState } from 'react';
import { ModFile, Category } from '@/types/game';
import { ModCard } from './ModCard';
import { Sparkles, Filter } from 'lucide-react';

interface ModGridProps {
  mods: ModFile[];
  onSelectMod: (mod: ModFile) => void;
}

export const ModGrid: React.FC<ModGridProps> = ({ mods, onSelectMod }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');

  const subCategories = ['All', 'Texture Packs', '60FPS Patches', 'Mods'];

  const filteredMods = mods.filter((mod) => {
    if (selectedSubCategory === 'All') return true;
    return mod.category === selectedSubCategory;
  });

  return (
    <section id="mods" className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Community Mod Files & Texture Overhauls
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curated HD graphics mods, widescreen hacks, and roster expansions.
          </p>
        </div>

        {/* Sub-category Pill Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          {subCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSubCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredMods.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No Mods Match This Category</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try switching to another category or clearing your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <ModCard key={mod.id} mod={mod} onSelect={onSelectMod} />
          ))}
        </div>
      )}
    </section>
  );
};
