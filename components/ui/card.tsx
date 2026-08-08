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
        "bg-[#111827]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl transition-all duration-300",
        hoverEffect && "hover:border-slate-700/80 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-black/50",
        glowing && "border-amber-500/30 streak-card-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
