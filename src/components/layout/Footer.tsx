import React from 'react';
import { Gamepad2, ShieldCheck, Heart, Code2, Globe, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-cyan-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">NEXUS HUB</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier open-source gaming community for downloading virus-scanned mods, game patches, texture packs, and high-performance emulators.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/50 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              100% Virus-Checked & MD5 Verified
            </div>
          </div>

          {/* Col 2: Emulators */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Emulators</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#emulators" className="hover:text-cyan-400 transition-colors">PCSX2 FX (PlayStation 2)</a></li>
              <li><a href="#emulators" className="hover:text-cyan-400 transition-colors">Ryujinx NX (Nintendo Switch)</a></li>
              <li><a href="#emulators" className="hover:text-cyan-400 transition-colors">PPSSPP Gold (PSP Mobile/PC)</a></li>
              <li><a href="#emulators" className="hover:text-cyan-400 transition-colors">Dolphin Master (GameCube/Wii)</a></li>
              <li><a href="#emulators" className="hover:text-cyan-400 transition-colors">RetroArch All-In-One</a></li>
            </ul>
          </div>

          {/* Col 3: Categories & Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Modding & Guides</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#mods" className="hover:text-purple-400 transition-colors">4K HD Texture Overhauls</a></li>
              <li><a href="#mods" className="hover:text-purple-400 transition-colors">60FPS & Widescreen Patches</a></li>
              <li><a href="#mods" className="hover:text-purple-400 transition-colors">Anime & Character Roster Mods</a></li>
              <li><a href="#guides" className="hover:text-purple-400 transition-colors">PCSX2 Setup & Performance Guide</a></li>
              <li><a href="#guides" className="hover:text-purple-400 transition-colors">Ryujinx 60FPS Optimization</a></li>
            </ul>
          </div>

          {/* Col 4: Community & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Community & Legal</h4>
            <ul className="space-y-2 text-xs mb-4">
              <li className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-indigo-400" /><a href="#community" className="hover:text-white">Discord Community Server</a></li>
              <li className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-indigo-400" /><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">GitHub Repository <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#dmca" className="hover:text-white">DMCA & Copyright Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms of Service & Rules</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Nexus Gaming Community. Built for Vercel deployment.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Gamers & Modders Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
