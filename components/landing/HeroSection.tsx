"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Flame, GitCommit, Share2, ShieldCheck, ArrowRight, Award, LogIn, CheckCircle2, TrendingUp } from "lucide-react";
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
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-slate-50">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-orange-700 shadow-xs">
          <Award className="h-3.5 w-3.5 text-orange-600" />
          <span>Exclusive 60-Day Challenge for Indian College Tech Talent</span>
        </div>

        {/* 1-Line Value Proposition */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4">
          Build in public for <span className="flame-text">60 days.</span>
          <br className="hidden xs:inline" /> Land on recruiters&apos; radar.
        </h1>

        {/* Sub-line Mechanic */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6">
          Pick a track, ship code daily, and prove it with a <span className="text-slate-900 font-semibold underline decoration-orange-500/80 decoration-2">GitHub commit</span> + <span className="text-slate-900 font-semibold underline decoration-blue-500/80 decoration-2">LinkedIn post</span> to build your verified public streak.
        </p>

        {/* Action Buttons: Primary CTA + Google Sign-In */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link href="/dashboard" onClick={handleStartStreak} className="w-full sm:w-auto">
            <Button size="lg" fullWidth variant="primary" className="text-base py-4 px-8 shadow-md shadow-orange-600/20 group">
              <Flame className="h-5 w-5 fill-white text-white group-hover:scale-110 transition-transform" />
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
              className="w-full sm:w-auto text-sm py-4 px-6 border-slate-300 hover:border-slate-400 text-slate-800"
            >
              <LogIn className="h-4 w-4 text-orange-600" />
              <span>Sign in with Google</span>
            </Button>
          ) : (
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button size="lg" fullWidth variant="secondary" className="py-4 px-6 text-sm text-slate-800">
                See How It Works
              </Button>
            </a>
          )}
        </div>

        {/* Mechanic Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 mb-10 font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <GitCommit className="h-4 w-4 text-emerald-600" />
            <span>Daily GitHub Commit</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <Share2 className="h-4 w-4 text-blue-600" />
            <span>LinkedIn Verified Proof</span>
          </div>
        </div>

        {/* Light Theme Squarish Box */}
        <div className="relative max-w-sm mx-auto p-5 rounded-xl bg-white border border-slate-200 streak-card-glow text-left">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl flame-gradient flex items-center justify-center shadow-sm">
                <Flame className="h-6 w-6 text-white fill-white animate-pulse-subtle" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">Public Streak Metric</div>
                <div className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                  <span>Day 24</span>
                  <Badge variant="emerald" size="sm" className="rounded-md">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-500 font-bold">Progress</div>
              <div className="text-sm font-black text-orange-600">24/60 Days</div>
            </div>
          </div>

          {/* Mini Contribution Heatmap */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
              <span>Continuous Momentum</span>
              <span className="text-emerald-700 font-bold">18 Days Active</span>
            </div>
            <div className="grid grid-cols-12 gap-1 pt-1">
              {Array.from({ length: 24 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-4 rounded-xs transition-all ${
                    idx === 15
                      ? "bg-rose-100 border border-rose-300"
                      : idx > 17
                      ? "flame-gradient shadow-xs"
                      : "bg-emerald-500 border border-emerald-400"
                  }`}
                  title={idx === 15 ? "Missed Day" : `Day ${idx + 1} Completed`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
