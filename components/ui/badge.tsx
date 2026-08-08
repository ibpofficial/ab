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
    flame: "bg-orange-50 text-orange-700 border-orange-200 rounded-lg",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 rounded-lg",
    rose: "bg-rose-50 text-rose-700 border-rose-200 rounded-lg",
    outline: "bg-white text-slate-700 border-slate-300 rounded-lg",
    neutral: "bg-slate-100 text-slate-700 border-slate-200 rounded-lg",
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
