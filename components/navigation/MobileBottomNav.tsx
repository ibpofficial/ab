"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Flame, User, Rss } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname.startsWith("/dashboard"),
    },
    {
      name: "Feed",
      href: "/feed",
      icon: Rss,
      isActive: pathname.startsWith("/feed"),
    },
    {
      name: "Challenge",
      href: "/day/12",
      icon: Flame,
      isActive: pathname.startsWith("/day"),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      isActive: pathname.startsWith("/profile") || pathname.startsWith("/u/"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-lg px-2 py-1.5">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
                item.isActive
                  ? "text-orange-700 font-extrabold bg-orange-50"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  item.isActive ? "text-orange-600 fill-orange-500/20" : ""
                }`}
              />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
