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
    <section className="py-10 border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center hover:border-orange-300 transition-colors shadow-xs"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-orange-100/80 text-orange-700 mb-2 border border-orange-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">
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
