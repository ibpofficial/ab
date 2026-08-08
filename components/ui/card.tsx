import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowing?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  children,
  glowing = false,
  hoverEffect = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl transition-all duration-200",
        hoverEffect && "hover:border-slate-700 hover:shadow-2xl hover:shadow-black/60",
        glowing && "border-amber-500/40 streak-card-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
