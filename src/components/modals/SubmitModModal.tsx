'use client';

import React, { useState } from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { Category, Platform, ModFile } from '@/types/game';

interface SubmitModModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newMod: ModFile) => void;
}

export const SubmitModModal: React.FC<SubmitModModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    gameName: '',
    category: 'Mods' as Category,
    platform: 'PlayStation 2' as Platform,
    author: '',
    downloadUrl: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.gameName || !formData.downloadUrl) {
      alert('Please fill out the Mod Title, Game Name, and Download URL.');
      return;
    }

    const createdMod: ModFile = {
      id: `mod-user-${Date.now()}`,
      name: formData.title,
      type: 'mod' as const,
      gameName: formData.gameName,
      category: formData.category,
      author: formData.author || 'Community Modder',
      version: 'v1.0',
      updatedAt: new Date().toISOString().split('T')[0],
      fileSize: 154000000,
      downloadsCount: 1,
      rating: 5.0,
      reviewsCount: 1,
      targetPlatform: formData.platform,
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      screenshots: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'],
      description: formData.description || 'Community uploaded mod file.',
      installInstructions: ['Download the mod archive.', 'Extract into your emulator mod directory.'],
      checksum: {
        md5: 'e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6',
        sha256: '5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b',
      },
      mirrors: [{ name: 'User Mirror Link', url: formData.downloadUrl, speed: 'Community Mirror' }],
      tags: ['Community Mod', formData.platform],
    };

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(createdMod);
      setSubmitted(false);
      setFormData({
        title: '',
        gameName: '',
        category: 'Mods',
        platform: 'PlayStation 2',
        author: '',
        downloadUrl: '',
        description: '',
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 relative border border-slate-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Mod Submitted Successfully!</h3>
            <p className="text-xs text-slate-300">
              Your mod file has been queued for automated virus scanning and added to the community showcase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Submit a Mod or Emulator</h3>
                <p className="text-xs text-slate-400">Share your creations or request a mod build from the community.</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Mod Title *</label>
              <input
                type="text"
                placeholder="e.g. Kingdom Hearts II - 4K HD Texture Pack"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Game Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Kingdom Hearts II (PS2)"
                  value={formData.gameName}
                  onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Author Name</label>
                <input
                  type="text"
                  placeholder="e.g. ModderName"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Texture Packs">Texture Packs</option>
                  <option value="60FPS Patches">60FPS Patches</option>
                  <option value="Mods">Mods</option>
                  <option value="Cheats & Trainers">Cheats & Trainers</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Target Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="PlayStation 2">PlayStation 2</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="PSP">PSP</option>
                  <option value="GameCube/Wii">GameCube/Wii</option>
                  <option value="Windows">Windows</option>
                  <option value="Android">Android</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Direct Download Link / Mirror URL *</label>
              <input
                type="url"
                placeholder="https://drive.google.com/... or https://nexusmods.com/..."
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Mod Description & Features</label>
              <textarea
                rows={3}
                placeholder="Describe what this mod changes or adds..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20"
              >
                Publish Mod
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
