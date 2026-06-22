## 2026-06-22T01:54:44Z
You are the Implementation Worker.
Your identity:
- TypeName: teamwork_preview_worker
- Working directory: c:\work\apps\osera web\.agents\worker_impl_replace_1
- Workspace path: c:\work\apps\osera web

Task:
Implement the color retheme, visual layout restructuring, specific features, and animations across the codebase according to the synthesized audit results in `c:\work\apps\osera web\.agents\sub_orch_impl\m1_audit_summary.md` and requirements:

1. Color Retheme & Typography (Milestone 3):
   - Import a luxury Serif font (e.g., Cinzel, Playfair Display, or Lora) at the top of `src/index.css` via `@import url(...)`.
   - In `src/index.css` `@theme`, define `--font-serif: 'Cinzel', serif` (or chosen font).
   - In `src/index.css`, clean up the cyan/sky/teal color class overrides and define gold/platinum palettes properly, or ensure standard class usages map to black/gold/platinum.
   - Retheme components by replacing forbidden colors (purple, violet, indigo, pink) with clean gold/platinum/black equivalents across `src/App.tsx`, `src/components/AdminPanel.tsx`, `src/components/AIAssistantChat.tsx`, `src/components/CodeDiffViewer.tsx`, and `src/data.ts`.
   - Update `src/components/ParticleSeparator.tsx` and `src/components/Hero3DScene.tsx` canvas rendering code to draw nodes/lines in gold/platinum RGBA instead of raw cyan, emerald green, or indigo.
   - Apply `font-serif` to all main header tags (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) in `src/App.tsx` and other components to establish Serif headers vs Sans-serif body contrast.

2. Visual Layout Restructuring for Asymmetric Tension (Milestone 4):
   - Redesign centered sections: replace centered titles `text-center max-w-xl mx-auto` with side-aligned editorial headers (e.g. using `grid lg:grid-cols-12` with a sidebar layout where header is left-aligned or rotated in `lg:col-span-3` and cards occupy `lg:col-span-9`).
   - Restructure the Hero section in `src/App.tsx` for asymmetric tension: push core text columns to the left (e.g. `col-span-9` or `10`), leave massive negative space, and position `Hero3DScene` absolutely to bleed off the right edge of the screen rather than being a symmetric side-by-side grid card.
   - Alternate column spans in the Service Cards grid (e.g. row 1 uses `col-span-7` & `col-span-5`, row 2 uses `col-span-5` & `col-span-7`) and stagger heights or offsets to break standard dual-column grids.
   - Restructure the Case Studies grid: make the first case study a flagship showcase spanning `lg:col-span-8`, and stack the other two on the right (`lg:col-span-4`).

3. Specific Features Implementation (Milestone 5):
   - Asymmetric Projects Gallery: Display previous works/projects using an asymmetric, editorial-style gallery in `src/App.tsx`.
   - Prominent AI Chatbot Interface: Keep the AI assistant elegantly integrated and prominent. Retheme all dialog elements, launchers, text colors, and borders to the new luxury/power theme.
   - Visible WhatsApp Lead Conversion Buttons: Replace all hardcoded WhatsApp number literals (`201066906132`) in `src/App.tsx` and `src/components/AIAssistantChat.tsx` with dynamic calls to `profile.whatsapp` (e.g. `https://wa.me/20${profile.whatsapp}...`) to keep CTAs dynamically editable via Admin Panel. Make all conversion buttons highly visible and aggressively positioned.

4. Scroll-Triggered Animations (Milestone 6):
   - Integrate scroll-triggered animations using Framer Motion (`motion/react`) by applying `whileInView`, `viewport`, or scroll-linked values to sections, cards, and text headers.
   - Add hover micro-interactions (subtle scale, gold glow) to interactive elements (buttons, cards, links).

5. Verification:
   - Run type-check (`npm run lint`) and build (`npm run build`) after changes to confirm compilation succeeds.
   - Record exactly what files were changed and what test/build outcomes were achieved.
