"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_FEED_POSTS, MOCK_TRACKS, MOCK_STUDENTS } from "@/lib/mock-data";
import {
  TrendingUp,
  Clock,
  Flame,
  Rss,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";

export type SortMode = "trending" | "latest" | "streaks";

export default function CommunityFeedPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [sortMode, setSortMode] = useState<SortMode>("trending");

  const displayedPosts = useMemo(() => {
    let filtered = [...MOCK_FEED_POSTS];
    if (selectedTrack !== "all") {
      filtered = filtered.filter((p) => p.track === selectedTrack);
    }

    if (sortMode === "trending") {
      filtered.sort((a, b) => {
        const scoreA = a.likes * 2 + a.comments * 3;
        const scoreB = b.likes * 2 + b.comments * 3;
        return scoreB - scoreA;
      });
    } else if (sortMode === "latest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortMode === "streaks") {
      filtered.sort((a, b) => {
        const studentA = MOCK_STUDENTS.find((s) => s.id === a.studentId);
        const studentB = MOCK_STUDENTS.find((s) => s.id === b.studentId);
        const streakA = studentA?.currentStreak || 0;
        const streakB = studentB?.currentStreak || 0;

        if (streakB !== streakA) return streakB - streakA;
        return b.likes - a.likes;
      });
    }

    return filtered;
  }, [selectedTrack, sortMode]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-3.5 sm:px-6 py-4 pb-24 sm:pb-12 space-y-3.5">
        {/* Minimal Header Line */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg flame-gradient text-white flex items-center justify-center shrink-0 shadow-xs">
              <Rss className="h-3.5 w-3.5" />
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Proof Feed
            </h1>
          </div>

          <span className="text-[11px] font-mono font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
            {displayedPosts.length} Public Proofs
          </span>
        </div>

        {/* Minimal Non-Sticky Single-Row Scrollable Control Strip (Scrolls Away Naturally With Page) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1.5 bg-white border border-slate-200/90 rounded-xl shadow-xs no-scrollbar scrollbar-none touch-pan-x">
          {/* Sort Mode Segmented Pills */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSortMode("trending")}
              className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-xs font-extrabold transition-all min-h-[32px] active:scale-95 ${
                sortMode === "trending"
                  ? "bg-orange-50 text-orange-700 border border-orange-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-3 w-3 text-orange-600 shrink-0" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setSortMode("latest")}
              className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-xs font-extrabold transition-all min-h-[32px] active:scale-95 ${
                sortMode === "latest"
                  ? "bg-orange-50 text-orange-700 border border-orange-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="h-3 w-3 text-blue-600 shrink-0" />
              <span>Latest</span>
            </button>

            <button
              onClick={() => setSortMode("streaks")}
              className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-xs font-extrabold transition-all min-h-[32px] active:scale-95 ${
                sortMode === "streaks"
                  ? "bg-orange-50 text-orange-700 border border-orange-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Flame className="h-3 w-3 text-emerald-600 fill-emerald-500/20 shrink-0" />
              <span>Streaks</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-slate-200 shrink-0 mx-0.5" />

          {/* Area/Track Filter Pills */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSelectedTrack("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 min-h-[32px] active:scale-95 ${
                selectedTrack === "all"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              All
            </button>

            {MOCK_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 min-h-[32px] active:scale-95 ${
                  selectedTrack === t.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Posts List */}
        {displayedPosts.length === 0 ? (
          <Card className="p-6 sm:p-8 text-center bg-white border-slate-200 space-y-4 rounded-2xl shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto">
              <Code2 className="h-6 w-6" />
            </div>

            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                No proof-of-work posts shipped yet in this track
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Be the first builder in this area to ship today&apos;s daily challenge and post your proof!
              </p>
            </div>

            <div className="pt-2">
              <Link href="/day/12">
                <Button variant="primary" size="sm" className="rounded-xl shadow-md shadow-orange-600/20 text-xs py-2 px-4">
                  <Sparkles className="h-4 w-4" />
                  <span>Be First to Submit Day 12</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {displayedPosts.map((post, idx) => (
              <FeedPostCard key={post.id} post={post} rankIndex={idx < 3 ? idx : undefined} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
