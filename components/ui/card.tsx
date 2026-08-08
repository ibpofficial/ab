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
        "bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_12px_-2px_rgba(0,0,0,0.02)] transition-all duration-200 text-slate-900",
        hoverEffect && "hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:-translate-y-[1px]",
        glowing && "border-orange-300 streak-card-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
