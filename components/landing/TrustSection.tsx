import React from "react";
import { Users, Code, Award, GitCommit } from "lucide-react";

export function TrustSection() {
  const stats = [
    {
      icon: Users,
      value: "2,840+",
      label: "Indian Students Enrolled",
      subtext: "From 120+ Engineering Colleges",
    },
    {
      icon: Code,
      value: "4 Tracks",
      label: "Specialized Curriculums",
      subtext: "Web Dev, DSA, ML & Mobile",
    },
    {
      icon: Award,
      value: "78%",
      label: "Avg Completion Rate",
      subtext: "vs 5% for standard MOOCs",
    },
    {
      icon: GitCommit,
      value: "14,200+",
      label: "Shipped Commits",
      subtext: "Verified public contributions",
    },
  ];

  return (
    <section className="py-10 border-y border-slate-800/90 bg-slate-950/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center hover:border-amber-500/40 transition-colors shadow-md"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 mb-2 border border-amber-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
