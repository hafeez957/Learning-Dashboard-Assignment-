# Next-Gen Learning Dashboard

## Live Demo
[Add Vercel link here]

## Tech Stack
- Next.js 14 (App Router)
- Supabase (PostgreSQL)
- Tailwind CSS
- Framer Motion
- TypeScript

## Features Implemented
- ✅ Bento grid layout with dark mode
- ✅ Collapsible sidebar navigation
- ✅ Server-side data fetching from Supabase
- ✅ Animated progress bars with spring physics
- ✅ Staggered page load animations
- ✅ Hover effects (scale + border glow)
- ✅ Weekly activity chart with tooltips
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Loading skeletons & error handling

## Architecture Decisions
- Used Server Components for initial data fetch
- Client components for interactive elements (Sidebar, Charts)
- Supabase SSR package for secure database connection

## Challenges Faced & Solutions
1. **Tailwind v4 compatibility** → Downgraded to v3 for stability
2. **Framer Motion spring physics** → Used stiffness: 300, damping: 20
3. **Responsive sidebar** → Implemented collapsible + mobile menu

## Local Setup
1. Clone repo
2. `npm install`
3. Create `.env.local` with Supabase keys
4. `npm run dev`

## Time Spent
4 days

## What I Would Improve Given More Time
- Add user authentication
- Real-time progress updates
- More chart customization options