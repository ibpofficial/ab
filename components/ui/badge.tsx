import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "flame" | "emerald" | "rose" | "dark" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "dark",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center font-medium rounded-full tracking-wide transition-colors";

  const variants = {
    flame:
      "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold shadow-sm shadow-amber-500/10",
    emerald:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold",
    rose: "bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold",
    dark: "bg-slate-800/90 text-slate-300 border border-slate-700/60",
    outline: "bg-transparent text-slate-400 border border-slate-700/80",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <span
      className={twMerge(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
