import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "flame" | "emerald" | "rose" | "outline" | "neutral";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "flame",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-bold tracking-tight border shadow-xs transition-colors";

  const variants = {
    flame: "bg-amber-500/15 text-amber-400 border-amber-500/30 rounded-lg",
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 rounded-lg",
    rose: "bg-rose-500/15 text-rose-400 border-rose-500/30 rounded-lg",
    outline: "bg-slate-900/80 text-slate-300 border-slate-700 rounded-lg",
    neutral: "bg-slate-800 text-slate-200 border-slate-700 rounded-lg",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <div
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
