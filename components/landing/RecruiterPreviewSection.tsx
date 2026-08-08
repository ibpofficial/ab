"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ExternalLink, Flame, CheckCircle2, GitCommit, Share2, Sparkles, ArrowRight, Award, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RecruiterPreviewSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-200/90 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gradient-to-l from-orange-400/10 via-amber-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Rationale & Bullet Points */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Recruiter Proof Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Turn daily effort into <span className="flame-text">hiring proof.</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Standard resume project lists get skipped in 15 seconds. A verified 60-day GitHub + LinkedIn commit streak gives recruiters immediate proof of technical discipline, daily output, and continuous grit.
            </p>

            {/* Value Bullet Points */}
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 transition-all hover:border-slate-300">
                <div className="h-8 w-8 rounded-lg bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  1
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-900">Custom Resume Header URL</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Paste your verified <code className="text-orange-700 font-mono font-bold">abtalks.dev/u/yourname</code> profile directly into your resume or LinkedIn bio.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 transition-all hover:border-slate-300">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  2
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-900">Dual Proof Verification</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Automated GitHub commit SHA checks paired with public LinkedIn build posts eliminate fluff.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 transition-all hover:border-slate-300">
                <div className="h-8 w-8 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  3
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-900">Featured Project Showcase</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Recruiters click directly into your 3 top featured builds without digging through tutorial repos.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex items-center gap-3">
              <Link href="/u/student-2">
                <Button variant="primary" size="md" className="rounded-xl shadow-md shadow-orange-600/20">
                  <UserCheck className="h-4 w-4" />
                  <span>View Sample Recruiter Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual SaaS Image Showcase & Teaser Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Image Showcase Card 1: Dashboard Mockup */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-100 via-orange-50/40 to-slate-100 p-2 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                {/* Browser Header Bar */}
                <div className="h-8 bg-slate-100 border-b border-slate-200/80 px-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold bg-white px-3 py-0.5 rounded-md border border-slate-200/80">
                    abtalks.dev/u/priyapatel-tech
                  </div>
                  <div className="w-8" />
                </div>

                {/* Main Feature Image */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-100">
                  <Image
                    src="/images/recruiter_proof_showcase.png"
                    alt="ABTalks Recruiter Proof Showcase Mockup"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Secondary Visual Image & Interactive Profile Teaser Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Secondary Image Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xs overflow-hidden group">
                <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/developer_streak_proof.png"
                    alt="Developer 60-Day Streak Proof Grid"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5 text-left">
                  <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">
                    60-Day Commit Analytics
                  </span>
                  <h4 className="font-extrabold text-xs text-slate-900 mt-0.5">
                    Verified Contribution Heatmap
                  </h4>
                </div>
              </div>

              {/* Interactive Profile Teaser Card */}
              <Card className="p-4 bg-white border-slate-200 shadow-xs space-y-3 rounded-2xl text-left flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full bg-orange-100 border border-orange-300 text-orange-700 flex items-center justify-center font-bold text-xs">
                        PP
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-900">Priya Patel</h4>
                        <p className="text-[10px] text-slate-500 font-medium">BITS Pilani</p>
                      </div>
                    </div>

                    <Badge variant="emerald" size="sm" className="rounded-md">
                      <CheckCircle2 className="h-3 w-3" /> Top 12%
                    </Badge>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 font-medium">
                    &quot;Building daily web applications, exploring Next.js App Router, TypeScript, and Firebase.&quot;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-500 font-medium">Streak: 23 Days</span>
                  <Link href="/u/student-2" className="text-orange-700 font-bold hover:underline flex items-center gap-1">
                    <span>View Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
