'use client';

import React from 'react';
import { Search, Download, ShieldCheck, Cpu, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { Platform } from '@/types/game';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: Platform | 'All';
  setSelectedPlatform: (platform: Platform | 'All') => void;
  totalEmulators: number;
  totalMods: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  totalEmulators,
  totalMods,
}) => {
  const platforms: (Platform | 'All')[] = [
    'All',
    'Windows',
    'Android',
    'PlayStation 2',
    'Nintendo Switch',
    'PSP',
    'GameCube/Wii',
  ];

  const popularTags = ['PCSX2', '4K Textures', 'Zelda 60FPS', 'Ryujinx', 'DBZ BT3 Mod', 'PPSSPP'];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-24 border-b border-slate-800/80">
      
      {/* Background Animated Neon Orbs & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-lg shadow-indigo-900/20 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>PCSX2 2.2 Release & 4K Texture Packs Are Live!</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          The Ultimate Vault for <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent neon-text-cyan">
            Game Mods & Emulators
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
          Download high-performance emulators, 60FPS patches, 4K texture mods, and character updates with high-speed CDN mirrors and MD5 checksum safety.
        </p>

        {/* Live Metrics Row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="glass-card p-3 rounded-xl flex items-center gap-3 text-left">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">1.2M+</div>
              <div className="text-[11px] text-slate-400">Total Downloads</div>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3 text-left">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{totalEmulators} Cores</div>
              <div className="text-[11px] text-slate-400">Verified Emulators</div>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3 text-left">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{totalMods}+ Mods</div>
              <div className="text-[11px] text-slate-400">Tested Mod Files</div>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-3 text-left">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Safe</div>
              <div className="text-[11px] text-slate-400">VirusScan Passed</div>
            </div>
          </div>
        </div>

        {/* Platform Quick Filter Pills */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-2 flex items-center gap-1">
            Filter Platform:
          </span>
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPlatform === p
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Popular Tags */}
        <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs">
          <span className="text-slate-500">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/40 px-2 py-0.5 rounded-md border border-slate-800/60"
            >
              #{tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
