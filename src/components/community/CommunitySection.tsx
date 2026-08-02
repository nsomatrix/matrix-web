'use client';

import React, { useState } from 'react';
import { CommunityPost } from '@/types/game';
import { MessageSquare, ThumbsUp, MessageCircle, CheckCircle2, ShieldCheck, Send, Sparkles } from 'lucide-react';

interface CommunitySectionProps {
  posts: CommunityPost[];
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ posts }) => {
  const [likeCounts, setLikeCounts] = useState<Record<string, { count: number; liked: boolean }>>(
    posts.reduce((acc, post) => {
      acc[post.id] = { count: post.likes, liked: false };
      return acc;
    }, {} as Record<string, { count: number; liked: boolean }>)
  );

  const handleLike = (id: string) => {
    setLikeCounts((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  return (
    <section id="community" className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Forum Posts Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Community Discussions & Mod Requests
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect with mod creators, ask setup questions, and share performance benchmarks.
              </p>
            </div>
          </div>

          {posts.map((post) => {
            const state = likeCounts[post.id] || { count: post.likes, liked: false };
            return (
              <div key={post.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-indigo-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{post.author.name}</span>
                        {post.author.badge && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                            {post.author.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{post.timestamp} • in {post.category}</span>
                    </div>
                  </div>

                  {post.solved && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Solved
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {post.content}
                </p>

                <div className="pt-3 border-t border-slate-800/60 flex items-center gap-4 text-xs">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      state.liked
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${state.liked ? 'fill-indigo-300' : ''}`} />
                    <span>{state.count}</span>
                  </button>

                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-white px-3 py-1 rounded-lg hover:bg-slate-800">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.replies} Replies</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Discord Banner & Rules */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-700/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/30">
              <MessageSquare className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white">Join 15,000+ Gamers on Discord</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Get instant help with emulator settings, early access to beta mod builds, and request custom texture ports directly from developers.
            </p>

            <button className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all">
              <Send className="w-4 h-4" />
              Connect to Discord
            </button>
          </div>

          {/* Guidelines */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Modding Safety & Ethics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>All submitted mod files are automatically scanned using MD5 and ClamAV checksums.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Respect copyright: We only host fan-made texture patches, scripts, and open-source emulators.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
