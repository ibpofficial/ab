import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";
import "./globals.css";

const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ABTalks — 60-Day Public Streak Challenge for Indian College Tech Talent",
  description:
    "Pick a track, build something daily, prove it with a GitHub commit and LinkedIn post. Build your verified public streak for recruiters.",
  keywords: [
    "ABTalks",
    "60 day coding challenge",
    "Indian college students",
    "build in public",
    "GitHub streak",
    "web dev",
    "DSA",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${sansFont.variable} h-full antialiased selection:bg-orange-500/20 selection:text-orange-900`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden pb-16 md:pb-0">
        <AuthProvider>
          {children}
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}


