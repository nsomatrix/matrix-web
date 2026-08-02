'use client';

import React from 'react';
import { Emulator } from '@/types/game';
import { Download, Star, Cpu, ShieldCheck, Monitor, Smartphone, Apple, Terminal } from 'lucide-react';
import { formatBytes, formatNumber } from '@/lib/utils';

interface EmulatorCardProps {
  emulator: Emulator;
  onSelect: (emulator: Emulator) => void;
}

export const EmulatorCard: React.FC<EmulatorCardProps> = ({ emulator, onSelect }) => {
  const getOsIcon = (os: string) => {
    switch (os) {
      case 'Windows':
        return <span title="Windows"><Monitor className="w-3.5 h-3.5 text-blue-400" /></span>;
      case 'Android':
        return <span title="Android"><Smartphone className="w-3.5 h-3.5 text-emerald-400" /></span>;
      case 'macOS':
        return <span title="macOS"><Apple className="w-3.5 h-3.5 text-slate-300" /></span>;
      case 'Linux':
        return <span title="Linux"><Terminal className="w-3.5 h-3.5 text-orange-400" /></span>;
      default:
        return <Monitor className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between relative group hover:border-indigo-500/50">
      
      {/* Top Banner / Badge Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            {emulator.consoleTarget}
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
              emulator.status === 'Stable'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : emulator.status === 'Active'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {emulator.status}
          </span>
        </div>

        {/* Emulator Name & Developer */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {emulator.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              by {emulator.developer} • {emulator.version}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {emulator.tagline}
        </p>

        {/* OS Support Icons */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-medium">Platforms:</span>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
            {emulator.platforms.map((os) => (
              <React.Fragment key={os}>{getOsIcon(os)}</React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {emulator.rating}
          </div>
          <div className="text-slate-400 text-[11px]">
            {formatNumber(emulator.downloadsCount)} dls
          </div>
          <div className="text-slate-400 text-[11px]">
            {formatBytes(emulator.fileSize)}
          </div>
        </div>

        <button
          onClick={() => onSelect(emulator)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>

    </div>
  );
};
