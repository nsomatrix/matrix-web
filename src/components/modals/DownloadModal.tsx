'use client';

import React, { useState, useEffect } from 'react';
import { Emulator, ModFile } from '@/types/game';
import { Download, ShieldCheck, Copy, Check, ExternalLink, Cpu, Clock } from 'lucide-react';
import { formatBytes, formatNumber } from '@/lib/utils';

interface DownloadModalProps {
  item: Emulator | ModFile | null;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ item, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'install'>('overview');
  const [countdown, setCountdown] = useState<number>(3);
  const [downloadReady, setDownloadReady] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    if (!item) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDownloadReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [item]);

  if (!item) return null;

  const isEmulator = item.type === 'emulator';
  const emulatorData = isEmulator ? (item as Emulator) : null;
  const modData = !isEmulator ? (item as ModFile) : null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(label);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-y-auto p-6 sm:p-8 relative border border-slate-700 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {/* Header Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                {isEmulator ? emulatorData?.consoleTarget : modData?.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Clean
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-wide">
              {item.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Version {item.version} • {formatBytes(item.fileSize)} • {formatNumber(item.downloadsCount)} downloads
            </p>
          </div>

          {/* Quick Download Button Block */}
          <div className="flex flex-col items-center sm:items-end">
            {!downloadReady ? (
              <div className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Preparing secure link in {countdown}s...</span>
              </div>
            ) : (
              <a
                href={item.mirrors[0]?.url || '#'}
                onClick={() => alert(`Starting download for ${item.name} (${formatBytes(item.fileSize)})`)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                Direct Download ({formatBytes(item.fileSize)})
              </a>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Overview & Features
          </button>
          {isEmulator && (
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'requirements'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              System Requirements
            </button>
          )}
          <button
            onClick={() => setActiveTab('install')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'install'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Setup Guide & Installation
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="py-6 space-y-6">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEmulator ? emulatorData?.description : modData?.description}
            </p>

            {/* Screenshots Gallery if available */}
            {modData && modData.screenshots.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Mod Screenshots Preview</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modData.screenshots.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Preview ${idx}`}
                      className="rounded-xl h-40 w-full object-cover border border-slate-800"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Features List for Emulators */}
            {isEmulator && emulatorData?.features && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Key Core Capabilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {emulatorData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checksums & Security Details */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Checksum Verification & Download Mirrors
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">SHA-256 Hash</span>
                    <span className="font-mono text-[11px] text-slate-300 truncate block max-w-[200px]">
                      {item.checksum.sha256}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.checksum.sha256, 'sha256')}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                  >
                    {copiedHash === 'sha256' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">MD5 Hash</span>
                    <span className="font-mono text-[11px] text-slate-300 truncate block max-w-[200px]">
                      {item.checksum.md5}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.checksum.md5, 'md5')}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                  >
                    {copiedHash === 'md5' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Mirror List */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">High Speed Mirror Servers:</span>
                <div className="space-y-2">
                  {item.mirrors.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{m.name}</span>
                        {m.isOfficial && <span className="text-[9px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">Primary CDN</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-emerald-400">{m.speed}</span>
                        <a
                          href={m.url}
                          onClick={() => alert(`Connecting to ${m.name}`)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1"
                        >
                          Mirror {idx + 1} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: System Requirements (Emulators only) */}
        {activeTab === 'requirements' && emulatorData && (
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
              <h4 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Minimum System Requirements
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li><strong className="text-white block">OS:</strong> {emulatorData.systemReqs.minimum.os}</li>
                <li><strong className="text-white block">Processor:</strong> {emulatorData.systemReqs.minimum.cpu}</li>
                <li><strong className="text-white block">Graphics:</strong> {emulatorData.systemReqs.minimum.gpu}</li>
                <li><strong className="text-white block">RAM:</strong> {emulatorData.systemReqs.minimum.ram}</li>
                <li><strong className="text-white block">Storage:</strong> {emulatorData.systemReqs.minimum.storage}</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
              <h4 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Recommended (4K 60FPS)
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li><strong className="text-white block">OS:</strong> {emulatorData.systemReqs.recommended.os}</li>
                <li><strong className="text-white block">Processor:</strong> {emulatorData.systemReqs.recommended.cpu}</li>
                <li><strong className="text-white block">Graphics:</strong> {emulatorData.systemReqs.recommended.gpu}</li>
                <li><strong className="text-white block">RAM:</strong> {emulatorData.systemReqs.recommended.ram}</li>
                <li><strong className="text-white block">Storage:</strong> {emulatorData.systemReqs.recommended.storage}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Installation Instructions */}
        {activeTab === 'install' && (
          <div className="py-6 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Step-by-step Setup Guide</h4>
            {(isEmulator ? emulatorData?.setupGuide : modData?.installInstructions)?.map((step, idx) => (
              <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
