# Project: OSERA Portfolio & AI Agent Redesign

## Architecture
- **Frontend App**: React + Vite TypeScript SPA.
- **Backend App**: Express + tsx server (`server.ts`) serving frontend and handling `/api/chat` using Gemini API.
- **Animations**: motion/react (Framer Motion v12).
- **Styling**: Tailwind CSS v4.
- **Integration**: LocalStorage for Corporate Profile, Web API endpoints for lead calculations/chat.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | E2E Testing Track Setup | Design and build comprehensive opaque-box E2E test cases across 4 Tiers. | none | PLANNED |
| M2 | Visual Layout & Colors Audit | Identify all grid/split patterns and purple references, and map code layout. | none | PLANNED |
| M3 | Luxury Re-theming & Asymmetric Tension | Re-theme colors to Black/Gold/Platinum, apply Serif/Sans-serif typography, remove purple. | M2 | PLANNED |
| M4 | Core Feature Redesign | Asymmetric Gallery, prominent AI Chat interface, and visible WhatsApp lead conversion buttons. | M3 | PLANNED |
| M5 | Fluid Scroll & Staggered Animations | Scroll-triggered entrances, hover glow/scale micro-interactions with Framer Motion. | M4 | PLANNED |
| M6 | Test Pass & Adversarial Hardening | Pass 100% of E2E tests, run Challenger-initiated Tier 5 coverage audit and fix gaps. | M1, M5 | PLANNED |

## Interface Contracts
### Client ↔ Server Chat API
- Endpoint: `POST /api/chat`
- Request: `{ message: string, profile: CorporateProfile }`
- Response: `{ text: string }`

### Client ↔ Server Blueprint API
- Endpoint: `POST /api/blueprint`
- Request: `BlueprintRequest`
- Response: `BlueprintResponse`

## Code Layout
- `src/App.tsx` - Main portfolio page, routing, and navbar.
- `src/components/AIAssistantChat.tsx` - AI Assistant slide-over/box.
- `src/components/AdminPanel.tsx` - Configuration settings for portfolio fields.
- `src/components/ExpertAudit.tsx` - Systems performance/design checklist.
- `src/components/ThreeDBackground.tsx` & `Hero3DScene.tsx` - Interactive visual separation components.
- `src/data.ts` - Shared services and case study details.
- `src/types.ts` - TypeScript interface contracts.
- `tests/` - E2E tests target directory.
