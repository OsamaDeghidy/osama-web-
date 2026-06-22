# OSERA Portfolio & AI Agent Redesign Plan

## Goal
Implement a luxury enterprise portfolio for OSERA with asymmetric tension layout, gold/platinum/black theme (no purple), fluid Framer Motion animations, a styled AI chatbot, prominent WhatsApp conversion buttons, and an editorial-style project gallery.

## Tasks
- [ ] Task 1: Initialize parallel E2E Testing Track to write opaque-box tests (Tiers 1-4) → Verify: `TEST_READY.md` published and test files created
- [ ] Task 2: Conduct visual and color audit of codebase to list all split screens and purple styles → Verify: Audit report in `.agents/`
- [ ] Task 3: Redesign global styles, typography, and colors (Black/Gold/Platinum, Serif headers, no purple) → Verify: CSS files and main page contain no purple and use target fonts
- [ ] Task 4: Restructure visual layout in `App.tsx` for asymmetric tension (remove 50/50 splits, push primary elements, negative space) → Verify: Visual layout inspectable
- [ ] Task 5: Redesign specific elements: asymmetric editorial projects gallery, WhatsApp buttons, AI Chat styling → Verify: Code contains buttons and styled chatbot
- [ ] Task 6: Add scroll-triggered animations and micro-interactions with Framer Motion → Verify: Animation hooks and styles present
- [ ] Task 7: E2E Testing validation (Tiers 1-4) → Verify: All tests pass
- [ ] Task 8: Tier 5 Adversarial testing & Forensic auditing → Verify: Gaps resolved, auditor verdict is CLEAN

## Done When
- [ ] Visual design verified asymmetric (no 50/50 splits)
- [ ] No purple, indigo, or violet in styling
- [ ] Active staggered scroll animations and micro-interactions implemented
- [ ] Prominent AI Chat and WhatsApp buttons in place
- [ ] Asymmetric gallery implemented
- [ ] 100% of E2E tests pass
- [ ] Forensic audit returns CLEAN
