# Codebase Audit Synthesis: Milestone 1

Based on parallel audits from layout, color/typography, and feature/animation explorers, we have compiled the codebase audit details below.

## 1. Layout & Grid Symmetries
- **Hero Section (`App.tsx` lines 860-952)**: Balanced grid layout (`lg:col-span-8` vs `lg:col-span-4`) with centered content (`items-center`). Hero 3D scene is confined within grid boundaries.
- **Service Cards (`App.tsx` line 1043)**: Standard `grid md:grid-cols-2 gap-8` where each card has the exact same dimensions.
- **Case Studies Grid (`App.tsx` line 1126)**: Symmetrical `grid md:grid-cols-3 gap-6`.
- **Global Stats Bar (`App.tsx` line 955)**: Symmetrical `grid grid-cols-2 md:grid-cols-4`.
- **Team Roster & Methodology (`App.tsx` lines 2125, 2179)**: Grid layouts of 5 columns and 4 columns with identical dimensions.
- **Section Headers (7 occurrences)**: Centered headers using `text-center max-w-xl mx-auto`.
- **Calculator & AI Layout Splits (`App.tsx`)**: Safe 7/5 and 5/7 splits with centered alignment.

## 2. Forbidden Colors (Purple, Violet, Indigo, Pink, Fuchsia, Rose)
We identified **11 occurrences** of prohibited colors to eliminate:
- `App.tsx` (line 1523): `<span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />`
- `data.ts` (line 37): `colorAccent: "purple"`
- `data.ts` (line 51): `colorAccent: "violet"`
- `index.css` (line 95): `.glow-purple` (named purple, although color values are gold). Rename to `.glow-gold-dim`.
- `AdminPanel.tsx` (line 728): `bg-gradient-to-tr from-cyan-400 to-indigo-600` (forbidden indigo).
- `AdminPanel.tsx` (line 786): `bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-455 hover:to-indigo-550` (forbidden indigo).
- `AdminPanel.tsx` (line 2002): `bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500` (forbidden indigo).
- `AIAssistantChat.tsx` (line 239): `text-pink-400`
- `AIAssistantChat.tsx` (line 241): `hover:bg-pink-950/30 hover:border-pink-500/30`
- `CodeDiffViewer.tsx` (line 123): `text-indigo-300`
- `CodeDiffViewer.tsx` (line 135): `text-pink-400`
- `Hero3DScene.tsx` (line 33): Indigo configurations: `color: "rgba(99, 102, 241, 0.45)"`, `activeColor: "rgba(99, 102, 241, 0.95)"`

## 3. Typography Issues
- `--font-serif` is not defined in the `@theme` section of `index.css`.
- Header tags (`h1`-`h6`) default to `font-sans` or are forced to `font-mono`.
- None of the headers utilize Serif fonts.

## 4. Retheming Elements (Black, Gold, Platinum)
- **CSS variable mapping hack**: `index.css` maps `cyan` classes to gold values (`--color-cyan-400: #d4af37`), creating code-name confusion.
- **Canvas Color Bleeds**: ParticleSeparator and Hero3DScene draw with actual cyan and indigo rgba colors directly, bypassing CSS variables.
- **Typography Fix**: Import a premium font (e.g. `Cinzel` or `Playfair Display`) and define `--font-serif` in Tailwind v4 `@theme`.

## 5. Animation (Framer Motion)
- Motion version 12 (`motion/react`) is used.
- Currently, **no scroll-triggered properties** (`whileInView`, `viewport`, `useScroll`) exist.
- Dynamic layout elements rely on mouse hover transitions or static entrance mount transitions.

## 6. Specific Features & Conversion Inconsistencies
- **Projects Gallery**: Uniform cards in grid with alternating spanning.
- **AI Chatbot**: Bouncing floating launcher with 3 tabs communicating with Groq via `/api/chat`.
- **WhatsApp link inconsistency**:
  - Hero section (lines 893-901) and AI Chatbot (tabs & contact list) are hardcoded to `201066906132`.
  - Calculator, Sidebar ports, and Generated Blueprint links use dynamic `profile.whatsapp`.
  - Action: Retheme WhatsApp links to dynamically load `profile.whatsapp` everywhere.
