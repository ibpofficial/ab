import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "google";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary:
      "flame-gradient text-white shadow-lg shadow-amber-600/30 hover:shadow-amber-500/50 hover:brightness-110 border border-amber-400/40 rounded-xl",
    secondary:
      "bg-slate-800/90 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600 rounded-xl shadow-md",
    outline:
      "bg-slate-900/60 text-amber-400 border border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400 rounded-xl",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg",
    google:
      "bg-slate-900 text-slate-100 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 rounded-xl shadow-md",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 gap-1.5 min-h-[38px]",
    md: "text-xs sm:text-sm px-5 py-2.5 gap-2 min-h-[44px]",
    lg: "text-sm sm:text-base px-6 py-3.5 gap-2.5 min-h-[50px] font-extrabold",
  };

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
