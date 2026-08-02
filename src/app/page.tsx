'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { EmulatorGrid } from '@/components/emulators/EmulatorGrid';
import { ModGrid } from '@/components/mods/ModGrid';
import { GuidesSection } from '@/components/guides/GuidesSection';
import { CommunitySection } from '@/components/community/CommunitySection';
import { DownloadModal } from '@/components/modals/DownloadModal';
import { SubmitModModal } from '@/components/modals/SubmitModModal';
import { EMULATORS_DATA, MODS_DATA, COMMUNITY_POSTS, GUIDES_DATA } from '@/data/mockData';
import { Category, Platform, Emulator, ModFile } from '@/types/game';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Category>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [emulatorsList] = useState<Emulator[]>(EMULATORS_DATA);
  const [modsList, setModsList] = useState<ModFile[]>(MODS_DATA);
  
  const [selectedDownloadItem, setSelectedDownloadItem] = useState<Emulator | ModFile | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Filter emulators according to search & platform filter
  const filteredEmulators = useMemo(() => {
    return emulatorsList.filter((emu) => {
      const matchesSearch =
        emu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emu.consoleTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emu.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform =
        selectedPlatform === 'All' ||
        emu.platforms.includes(selectedPlatform) ||
        emu.consoleTarget === selectedPlatform;

      return matchesSearch && matchesPlatform;
    });
  }, [emulatorsList, searchQuery, selectedPlatform]);

  // Filter mods according to search & platform filter
  const filteredMods = useMemo(() => {
    return modsList.filter((mod) => {
      const matchesSearch =
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.gameName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPlatform =
        selectedPlatform === 'All' ||
        mod.targetPlatform === selectedPlatform;

      return matchesSearch && matchesPlatform;
    });
  }, [modsList, searchQuery, selectedPlatform]);

  const handleAddNewMod = (newMod: ModFile) => {
    setModsList((prev) => [newMod, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          totalEmulators={emulatorsList.length}
          totalMods={modsList.length}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* Section 1: Emulators Vault */}
          {(activeTab === 'All' || activeTab === 'Emulators') && (
            <EmulatorGrid
              emulators={filteredEmulators}
              onSelectEmulator={(emu) => setSelectedDownloadItem(emu)}
            />
          )}

          {/* Section 2: Mod Files Grid */}
          {(activeTab === 'All' || activeTab === 'Mods' || activeTab === 'Texture Packs' || activeTab === '60FPS Patches') && (
            <ModGrid
              mods={filteredMods}
              onSelectMod={(mod) => setSelectedDownloadItem(mod)}
            />
          )}

          {/* Section 3: Installation Guides */}
          {(activeTab === 'All' || activeTab === 'Guides') && (
            <GuidesSection guides={GUIDES_DATA} />
          )}

          {/* Section 4: Community Discussions */}
          {activeTab === 'All' && (
            <CommunitySection posts={COMMUNITY_POSTS} />
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Download & Specs Modal */}
      <DownloadModal
        key={selectedDownloadItem?.id}
        item={selectedDownloadItem}
        onClose={() => setSelectedDownloadItem(null)}
      />

      {/* Submit Mod Modal */}
      <SubmitModModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleAddNewMod}
      />

    </div>
  );
}
