"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Flame, GitCommit, Share2, ShieldCheck, ArrowRight, Sparkles, LogIn, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const { user, isAnonymous, signInAnonymouslyUser, signInWithGoogle } = useAuth();

  const handleStartStreak = () => {
    if (!user) {
      signInAnonymouslyUser();
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-xs font-bold text-amber-400 shadow-md">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>Exclusive 60-Day Challenge for Indian College Tech Talent</span>
        </div>

        {/* 1-Line Value Proposition */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
          Build in public for <span className="flame-text">60 days.</span>
          <br className="hidden xs:inline" /> Land on recruiters&apos; radar.
        </h1>

        {/* Sub-line Mechanic */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed mb-6">
          Pick a track, ship code daily, and prove it with a <span className="text-white font-semibold underline decoration-amber-500/80 decoration-2">GitHub commit</span> + <span className="text-white font-semibold underline decoration-blue-400/80 decoration-2">LinkedIn post</span> to build your verified public streak.
        </p>

        {/* Action Buttons: Primary CTA + Google Sign-In */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link href="/dashboard" onClick={handleStartStreak} className="w-full sm:w-auto">
            <Button size="lg" fullWidth variant="primary" className="text-base py-4 px-8 shadow-xl shadow-amber-600/30 group">
              <Flame className="h-5 w-5 fill-amber-200 text-amber-200 group-hover:scale-110 transition-transform" />
              <span>Start your streak</span>
              <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {!user || isAnonymous ? (
            <Button
              size="lg"
              fullWidth
              variant="google"
              onClick={signInWithGoogle}
              className="w-full sm:w-auto text-sm py-4 px-6 border-slate-700 hover:border-amber-500/50"
            >
              <LogIn className="h-4 w-4 text-amber-400" />
              <span>Sign in with Google</span>
            </Button>
          ) : (
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button size="lg" fullWidth variant="secondary" className="py-4 px-6 text-sm text-slate-200">
                See How It Works
              </Button>
            </a>
          )}
        </div>

        {/* Mechanic Pill Badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-300 mb-10 font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <GitCommit className="h-4 w-4 text-emerald-400" />
            <span>Daily GitHub Commit</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <Share2 className="h-4 w-4 text-blue-400" />
            <span>LinkedIn Proof</span>
          </div>
        </div>

        {/* Squarish Momentum Motif Box */}
        <div className="relative max-w-sm mx-auto p-5 rounded-xl bg-slate-900/90 border border-amber-500/40 streak-card-glow text-left">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl flame-gradient flex items-center justify-center shadow-md">
                <Flame className="h-6 w-6 text-white fill-amber-200 animate-pulse-subtle" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase">Live Streak Counter</div>
                <div className="text-lg font-black text-white flex items-center gap-1.5">
                  <span>Day 24</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    🔥 Active
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-bold">Total Goal</div>
              <div className="text-sm font-black text-amber-400">24/60 Days</div>
            </div>
          </div>

          {/* Mini Contribution Heatmap */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-300 font-semibold">
              <span>Current Momentum</span>
              <span className="text-emerald-400 font-bold">18-Day Continuous Streak</span>
            </div>
            <div className="grid grid-cols-12 gap-1 pt-1">
              {Array.from({ length: 24 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-4 rounded-sm transition-all ${
                    idx === 15
                      ? "bg-rose-500/30 border border-rose-500/40"
                      : idx > 17
                      ? "flame-gradient shadow-sm shadow-amber-500/50"
                      : "bg-emerald-500/80 border border-emerald-400/40"
                  }`}
                  title={idx === 15 ? "Missed Day" : `Day ${idx + 1} Shipped`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
