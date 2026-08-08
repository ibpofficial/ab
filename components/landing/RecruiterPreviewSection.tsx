import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, Flame, CheckCircle2, GitCommit, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecruiterPreviewSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-slate-200 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Motivation Side */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Recruiter Visibility Engine</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Turn daily effort into <span className="flame-text">hiring proof.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Resume projects are forgotten in seconds. A continuous, verified 60-day GitHub + LinkedIn commit streak proves discipline, technical momentum, and grit to hiring managers.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Public Shareable URL:</strong> Paste your custom `/u/yourname` link in your resume header.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Dual Proof Verification:</strong> Automated GitHub commit SHA + LinkedIn activity checks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Fluff Portfolio:</strong> Recruiters see real code diffs, not standard tutorial clones.</span>
              </li>
            </ul>
          </div>

          {/* Interactive "What Recruiters See" Preview Card Side */}
          <div className="lg:col-span-7">
            <div className="relative p-1 rounded-xl bg-gradient-to-b from-orange-200 via-slate-100 to-slate-200 shadow-lg">
              <Card className="bg-white border-slate-200 p-5 sm:p-6 space-y-5 rounded-xl text-slate-900">
                {/* Header Profile Teaser */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-orange-400/80 bg-slate-100 shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                          alt="Priya Patel"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-base">Priya Patel</h4>
                        <Badge variant="emerald" size="sm" className="rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Verified Student
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">BITS Pilani • Full-Stack Web Dev Track</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-extrabold flex items-center gap-1.5">
                      <Flame className="h-4 w-4 fill-orange-600 text-orange-600" />
                      <span>23/60 Streak</span>
                    </div>
                  </div>
                </div>

                {/* Recruiter Verified Proof Metrics */}
                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Active Streak</div>
                    <div className="text-base font-black text-orange-600">18 Days</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Commits</div>
                    <div className="text-base font-black text-slate-900">23 Shipped</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Verification</div>
                    <div className="text-base font-black text-emerald-600">100% Valid</div>
                  </div>
                </div>

                {/* Public Share URL Banner Concept */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700 truncate">
                    <Share2 className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                    <span className="text-slate-500 font-medium">Shareable Profile:</span>
                    <span className="font-mono text-orange-700 font-bold truncate">abtalks.dev/u/priya-patel</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    Live
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 italic text-center font-medium">
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
