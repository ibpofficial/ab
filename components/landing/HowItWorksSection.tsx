import React from "react";
import { Compass, CalendarCheck2, GitBranch, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Compass,
      title: "Pick a Track",
      description: "Choose Web Dev, DSA & Algorithms, ML/AI, or Mobile App Development based on your career goal.",
      tag: "Step 1",
    },
    {
      number: "02",
      icon: CalendarCheck2,
      title: "Get Daily Challenge",
      description: "Unlock a concise, high-yield daily task brief every evening after your college lectures.",
      tag: "Step 2",
    },
    {
      number: "03",
      icon: GitBranch,
      title: "Ship + Prove It",
      description: "Write clean code, push your commit to GitHub, and post proof link on LinkedIn to verify.",
      tag: "Step 3",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Build Public Streak",
      description: "Keep your daily flame burning for 60 continuous days and unlock your recruiter-ready profile URL.",
      tag: "Step 4",
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            The 60-Day Habit Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How it works in <span className="flame-text">4 simple steps</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
            Designed specifically for busy Indian engineering students. Takes 45-60 mins per night.
          </p>
        </div>

        {/* Scannable 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card
                key={idx}
                className="relative flex flex-col justify-between overflow-hidden border-slate-800 bg-slate-900/90 p-5 rounded-xl group hover:border-amber-500/40"
              >
                {/* Number Watermark */}
                <span className="absolute -top-3 -right-2 text-6xl font-black text-slate-800/40 select-none pointer-events-none group-hover:text-amber-500/15 transition-colors">
                  {step.number}
                </span>

                <div>
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-amber-400 mb-1">
                    {step.tag}
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
