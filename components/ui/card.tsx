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
        "bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm transition-all duration-200 text-slate-900",
        hoverEffect && "hover:border-slate-300 hover:shadow-md",
        glowing && "border-amber-400/80 streak-card-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
