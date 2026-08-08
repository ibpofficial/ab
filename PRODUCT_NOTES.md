# ABTalks 60 Platform — Product Notes & Implementation Log

## Architectural Summary
- **Framework**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Design System**: Midnight Obsidian Dark Theme (`#090d16` shell, `#0f172a` card surface, `#ff6b00` electric flame orange accents)
- **Backend & Persistence**: Firebase Firestore (`students`, `tracks`, `challengeDays`, `submissions`)
- **Authentication**: Firebase Authentication (Google OAuth + Anonymous Guest Sessions)

## Version & Bug Resolution Log
- **Phase 1**: Next.js scaffold, Tailwind design tokens, Firestore collections seeded.
- **Phase 2**: Dashboard (`/dashboard`) layout, persona switcher, milestone badges.
- **Phase 3**: Challenge Day (`/day/12`), submission flow, Firebase Auth (Google + Anonymous).
- **Phase 4**: Wired live Firestore persistence across all 8 data-layer fixes (real submission writes, pure `computeStreakStats` helper in `lib/streak.ts`, live dashboard/day reads, seeding all 60 challenge days, live public profile fetches, production persona switcher gate, and `linkWithCredential` account linking).
- **Part 4 Surgical Audit**: Resolved open Fix A (atomic `linkWithPopup` linking without streak loss), Fix B (`liveSubmissions` prop passed to `ProgressGridSection`), and Fix C (restored established dark theme shell & cards across all pages).
