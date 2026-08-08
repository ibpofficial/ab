import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, Flame, CheckCircle2, GitCommit, Share2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecruiterPreviewSection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-950/90 border-y border-slate-800/90 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Motivation Side */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Recruiter Visibility Engine</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Turn daily effort into <span className="flame-text">hiring proof.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Resume projects are forgotten in seconds. A continuous, verified 60-day GitHub + LinkedIn commit streak proves discipline, technical momentum, and grit to hiring managers.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Public Shareable URL:</strong> Paste your custom `/u/yourname` link in your resume header.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dual Proof Verification:</strong> Automated GitHub commit SHA + LinkedIn activity checks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Fluff Portfolio:</strong> Recruiters see real code diffs, not standard tutorial clones.</span>
              </li>
            </ul>
          </div>

          {/* Interactive "What Recruiters See" Preview Card Side */}
          <div className="lg:col-span-7">
            <div className="relative p-1 rounded-xl bg-gradient-to-b from-amber-500/30 via-slate-800/60 to-slate-900 shadow-2xl">
              <Card className="bg-[#0f172a] border-slate-800 p-5 sm:p-6 space-y-5 rounded-xl">
                {/* Header Profile Teaser */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-amber-500/60 bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                          alt="Priya Patel"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#0f172a]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-white text-base">Priya Patel</h4>
                        <Badge variant="emerald" size="sm" className="rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Verified Student
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300">BITS Pilani • Full-Stack Web Dev Track</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold flex items-center gap-1.5">
                      <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>23/60 Streak</span>
                    </div>
                  </div>
                </div>

                {/* Recruiter Verified Proof Metrics */}
                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Active Streak</div>
                    <div className="text-base font-black text-amber-400">18 Days</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Commits</div>
                    <div className="text-base font-black text-white">23 Shipped</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Verification</div>
                    <div className="text-base font-black text-emerald-400">100% Valid</div>
                  </div>
                </div>

                {/* Public Share URL Banner Concept */}
                <div className="p-3 rounded-lg bg-slate-900/95 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300 truncate">
                    <Share2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-400">Shareable Profile:</span>
                    <span className="font-mono text-amber-300 font-bold truncate">abtalks.dev/u/priya-patel</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                    Live
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 italic text-center">
                  💡 This is what recruiters see when clicking a student&apos;s public streak profile link.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
