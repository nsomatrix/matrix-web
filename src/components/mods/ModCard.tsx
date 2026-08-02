'use client';

import React from 'react';
import { ModFile } from '@/types/game';
import { Download, Star, Sparkles, Tag, Calendar, Layers } from 'lucide-react';
import { formatBytes, formatNumber } from '@/lib/utils';

interface ModCardProps {
  mod: ModFile;
  onSelect: (mod: ModFile) => void;
}

export const ModCard: React.FC<ModCardProps> = ({ mod, onSelect }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-purple-500/50">
      
      {/* Thumbnail Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={mod.thumbnailUrl}
          alt={mod.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-950/90 text-purple-300 border border-purple-700/50 shadow-md">
            {mod.category}
          </span>
          {mod.targetEmulator && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-700/50 shadow-md">
              {mod.targetEmulator}
            </span>
          )}
        </div>

        {/* Game Title on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] font-semibold text-cyan-400 block truncate">
            {mod.gameName}
          </span>
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {mod.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {mod.description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {mod.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {mod.rating}
          </div>
          <div className="text-slate-400 text-[11px]">
            {formatNumber(mod.downloadsCount)} dls
          </div>
          <div className="text-slate-400 text-[11px]">
            {formatBytes(mod.fileSize)}
          </div>
        </div>

        <button
          onClick={() => onSelect(mod)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          Get Mod
        </button>
      </div>

    </div>
  );
};
