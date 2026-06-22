# Scope: E2E Testing Suite

## Architecture
- **Framework**: Playwright (or Node/Puppeteer/jsdom fallback if Playwright is blocked)
- **Target Environment**: Localhost (frontend or backend port)
- **Opaque-Box Testing**: No imports from React source code. Tests will interact with the DOM via CSS selectors, attributes, text content, and compute styles via standard browser APIs (`window.getComputedStyle`).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Infra Setup | Install Playwright package, browser binaries, configure `playwright.config.ts`. | none | DONE |
| 2 | Implement 71 Test Cases | Implement Tiers 1-4 tests covering the 6 core features (30 Tier 1, 30 Tier 2, 6 Tier 3, 5 Tier 4). | 1 | DONE |
| 3 | Document Test Suite | Create `TEST_INFRA.md` describing inventory, runner commands, format. | 2 | DONE |
| 4 | Execute and Verify | Run the test suite on baseline code. Confirm execution outputs failure report for unimplemented features. | 2 | DONE |
| 5 | Publish TEST_READY.md | Place `TEST_READY.md` in the project root to signal test suite completion to the implementation track. | 4 | DONE |

## Interface Contracts
- **Test execution command**: `npm run test:e2e` or similar
- **Environment configurations**: Read server base URL from environment variable or fallback to `http://localhost:5173` / `http://localhost:3000`
- **Output layout**: Tests live in `tests/` directory.

## Core Features Under Test
1. **Visual Style and Color Palette**: Gold/Platinum/Black theme, no purple/indigo/violet in style declarations.
2. **Asymmetric Layout/Tension**: Verify splits are not standard 50/50 grids, primary elements pushed to one edge.
3. **Animations and Micro-interactions**: Hover micro-interactions (glow, scale), scroll-triggered entries.
4. **AI Chatbot Interface**: Elegant slide-over or box, prominent and matches dark luxury theme.
5. **Lead Conversion**: Highly visible WhatsApp conversion buttons with correct links/attributes.
6. **Projects Gallery**: Editorial-style asymmetric grid/layout, custom styling.
