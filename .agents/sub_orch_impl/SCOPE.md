# Scope: Implementation Redesign

## Architecture
- **Tech Stack**: React 19, Vite 6, Tailwind CSS 4, Motion/React (Framer Motion), TypeScript, Express.js (server.ts).
- **Core Components**:
  - `src/App.tsx`: Main layout, navigation, hero, statistics, testimonials, team, contact/calculator.
  - `src/components/AIAssistantChat.tsx`: AI chat drawer/dialog.
  - `src/components/AdminPanel.tsx`: Admin system controls.
  - `src/components/ThreeDBackground.tsx`: Interactive WebGL/Canvas graphics.
  - `src/index.css`: Global custom styles, font families, base Tailwind layers.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Milestone 1: Codebase Audit | Audit codebase for split screens, standard grids, and purple styles. | None | DONE |
| 3 | Milestone 3: Color/Type Re-theme | Re-theme to Black/Gold/Platinum, Serif headers, Sans body, no purple. | M1 | IN_PROGRESS (0d5e01d6) |
| 4 | Milestone 4: Asymmetric Layout | Restructure visual layout in App.tsx for asymmetric tension, negative space. | M3 | IN_PROGRESS (0d5e01d6) |
| 5 | Milestone 5: Specific Features | Implement asymmetric gallery, prominent AI chat, WhatsApp lead buttons. | M4 | IN_PROGRESS (0d5e01d6) |
| 6 | Milestone 6: Framer Motion Animations | Add scroll-triggered animations and micro-interactions (scale, glow). | M5 | IN_PROGRESS (0d5e01d6) |

## Interface Contracts
- The web app operates client-side with a node production wrapper (`server.ts`).
- Development Server: `npm run dev`
- Production Build: `npm run build`
- Tailwind: CSS-first config in `src/index.css` via Tailwind v4 directives.
