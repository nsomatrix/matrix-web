export type Category = 'All' | 'Emulators' | 'Mods' | 'Texture Packs' | '60FPS Patches' | 'Cheats & Trainers' | 'Guides';

export type Platform = 'Windows' | 'macOS' | 'Linux' | 'Android' | 'PlayStation 2' | 'Nintendo Switch' | 'GameCube/Wii' | 'PSP' | 'PS3' | 'Retro';

export interface SystemRequirements {
  os: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
}

export interface Mirror {
  name: string;
  url: string;
  speed: string;
  isOfficial?: boolean;
}

export interface Emulator {
  id: string;
  name: string;
  type: 'emulator';
  tagline: string;
  description: string;
  version: string;
  releaseDate: string;
  consoleTarget: string; // e.g. PlayStation 2, Nintendo Switch
  platforms: Platform[]; // Host OS supported
  downloadsCount: number;
  rating: number;
  reviewsCount: number;
  fileSize: number; // in bytes
  status: 'Stable' | 'Active' | 'Experimental';
  developer: string;
  iconUrl?: string;
  bannerUrl?: string;
  checksum: {
    md5: string;
    sha256: string;
  };
  mirrors: Mirror[];
  systemReqs: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
  features: string[];
  setupGuide: string[];
  featured?: boolean;
}

export interface ModFile {
  id: string;
  name: string;
  type: 'mod';
  gameName: string;
  category: Category;
  author: string;
  version: string;
  updatedAt: string;
  fileSize: number;
  downloadsCount: number;
  rating: number;
  reviewsCount: number;
  targetPlatform: Platform;
  targetEmulator?: string; // e.g., PCSX2, Ryujinx
  thumbnailUrl: string;
  screenshots: string[];
  description: string;
  installInstructions: string[];
  checksum: {
    md5: string;
    sha256: string;
  };
  mirrors: Mirror[];
  tags: string[];
  featured?: boolean;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge?: string;
  };
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  timestamp: string;
  solved?: boolean;
}

export interface Guide {
  id: string;
  title: string;
  gameOrEmulator: string;
  author: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  views: number;
  summary: string;
  steps: {
    title: string;
    content: string;
    codeOrPath?: string;
  }[];
}
