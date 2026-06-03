# Next-Gen Learning Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-ff69b4)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)

## 📖 Overview

A futuristic, highly animated student dashboard built as part of a frontend intern challenge. The dashboard features a Bento grid layout, dynamic course data from Supabase, and smooth hardware-accelerated animations using Framer Motion.

**Live Demo:** [Add your Vercel URL here after deployment]

---

## 🎯 Features Implemented

### Core Requirements
- ✅ **Dark Mode Only** - Deep background tones with subtle glowing gradients
- ✅ **Bento Grid Layout** - Dynamic grid with spanning tiles
- ✅ **Collapsible Sidebar** - Slim navigation that collapses from 256px to 80px
- ✅ **Hero Tile** - Welcome message with 7-day learning streak indicator
- ✅ **Dynamic Course Tiles** - Courses fetched from Supabase PostgreSQL database
- ✅ **Activity Chart** - Interactive weekly activity bar chart with tooltips
- ✅ **Animated Progress Bars** - Spring physics animations from 0% to actual progress

### Animation & Interactions (Framer Motion)
- ✅ Staggered page load with sequential tile appearance
- ✅ Card hover effects (scale 1.02x + border glow)
- ✅ Spring physics configuration (`stiffness: 300, damping: 20`)
- ✅ Smooth sidebar transitions
- ✅ Animated progress bars with shimmer effect

### Technical Requirements
- ✅ Next.js 14 App Router
- ✅ Server Components for data fetching (RSC)
- ✅ TypeScript with proper interfaces
- ✅ Tailwind CSS for styling
- ✅ Supabase integration with Row Level Security
- ✅ Loading skeletons (`loading.tsx`)
- ✅ Error boundaries (`error.tsx`)
- ✅ Responsive design (mobile, tablet, desktop)

---

## 🏗️ Architecture Decisions

### Server vs Client Components
- **Server Components** (`page.tsx`): Initial data fetch from Supabase
- **Client Components**: Sidebar (interactive), Charts (tooltips), Cards (hover effects)

### Why This Split?
- Server Components improve SEO and initial load time
- Client Components enable interactivity (hover states, tooltips, toggles)

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom gradients for glowing effects
- CSS variables for consistent theming

---