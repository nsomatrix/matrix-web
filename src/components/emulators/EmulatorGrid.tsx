'use client';

import React from 'react';
import { Emulator } from '@/types/game';
import { EmulatorCard } from './EmulatorCard';
import { Cpu, Sparkles } from 'lucide-react';

interface EmulatorGridProps {
  emulators: Emulator[];
  onSelectEmulator: (emulator: Emulator) => void;
}

export const EmulatorGrid: React.FC<EmulatorGridProps> = ({ emulators, onSelectEmulator }) => {
  return (
    <section id="emulators" className="py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Official Emulators Vault
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Top open-source console emulators verified for speed, graphics scaling, and netplay.
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
          Showing {emulators.length} Emulators
        </span>
      </div>

      {emulators.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No Emulators Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your platform filters or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emulators.map((emu) => (
            <EmulatorCard key={emu.id} emulator={emu} onSelect={onSelectEmulator} />
          ))}
        </div>
      )}
    </section>
  );
};
