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
    "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md shadow-orange-600/20 hover:shadow-lg border border-orange-500/30 rounded-xl",
    secondary:
      "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 rounded-xl shadow-sm",
    outline:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 rounded-xl shadow-sm",
    ghost:
      "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg",
    google:
      "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 rounded-xl shadow-sm",
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
