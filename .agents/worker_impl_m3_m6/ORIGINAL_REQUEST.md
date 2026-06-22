# Worker Task Request: Redesign and Implementation (Milestones 3-6)

## INTEGRITY WARNING
> DO NOT CHEAT. All implementations must be genuine. DO NOT
> hardcode test results, create dummy/facade implementations, or
> circumvent the intended task. A Forensic Auditor will independently
> verify your work. Integrity violations WILL be detected and your
> work WILL be rejected.

## Objective
Implement the luxury redesign (Black, Gold, Platinum theme) and asymmetric layout of the OSERA web portfolio and AI agent interface, covering Milestones 3, 4, 5, and 6.

## Scope of Work

### Milestone 3: Color/Typography Re-theme
- **Luxury Color Theme**: Update the design to use a "Deep Black & Platinum/Gold" color scheme.
- **Purple Ban**: Remove all purple, violet, indigo, pink, fuchsia, and rose classes or color codes from the UI (including gradients and configurations).
- **Typography**:
  - Define a high-contrast serif font family (e.g. `@import` a premium serif font like Cinzel or Playfair Display, or map a standard system serif) and define it as `--font-serif` in Tailwind v4 `@theme` in `src/index.css`.
  - Update all header tags (`h1` through `h6`) to use this serif font, while keeping the body text in a clean modern sans-serif font.
- **Canvas/Graphics Theme**: Update color settings in WebGL/Canvas graphics (`src/components/Hero3DScene.tsx` and `src/components/ParticleSeparator.tsx`) to draw in gold/platinum/white rgb/rgba values, removing any cyan or indigo bleeds.
- **Clean Up Theme Hacks**: Clean up the custom cyan-to-gold mapping variables in `index.css`. Ensure gold/platinum elements are properly named and referenced.

### Milestone 4: Asymmetric Visual Layout
- **Hero Section**: Restructure `src/App.tsx` Hero section layout to break standard splits or grid predictability. Apply an extreme asymmetrical layout (e.g., 80/20 or 90/10 layout grid or flex layout) that pushes core headlines and elements to one edge, leaving substantial negative space to project tension and power.
- **Grids Restructuring**: Eliminate generic equal-dimension card grids for Services, Testimonials, Team, and Case Studies. Introduce asymmetric structures:
  - E.g. staggered column sizes (`md:col-span-8` vs `md:col-span-4`), varying offsets, or staggered row layouts.
  - Avoid centered section headers (`text-center max-w-xl mx-auto`). Push headers to the side/margins or align them asymmetrically.

### Milestone 5: Specific Features & Conversion
- **Asymmetric Projects Gallery**: Implement an asymmetric, editorial-style projects gallery displaying past projects/works instead of standard grid layouts.
- **Prominent AI Chat Interface**: Keep the AI assistant elegantly integrated but visually prominent and consistent with the luxury theme (no purple/pink accents).
- **WhatsApp Lead Conversion**: Ensure WhatsApp lead conversion buttons are highly visible, styled for high conversion, and positioned aggressively. Update all hardcoded WhatsApp phone numbers in `src/App.tsx` and related components to load dynamically from `profile.whatsapp`.

### Milestone 6: Framer Motion Animations
- **Motion/React**: Use `motion` or `motion/react` (Vite project uses `motion`).
- **Scroll Animations**: Add scroll-triggered animations to sections and key items (e.g. `whileInView`, `viewport={{ once: true }}`).
- **Interactive Micro-interactions**: Add interactive hover/active states (e.g. subtle scaling, elegant glow effects, shifting gradients) on buttons, project cards, and interactive elements.

## Target Files
- `src/App.tsx`
- `src/index.css`
- `src/data.ts`
- `src/components/AIAssistantChat.tsx`
- `src/components/AdminPanel.tsx`
- `src/components/Hero3DScene.tsx`
- `src/components/ParticleSeparator.tsx`
- `src/components/ThreeDBackground.tsx`

## Verification Requirements
- Compile the code successfully using `npm run build` and ensure type-checking (`npm run lint` or `tsc --noEmit`) passes.
- Document all modified files and how they address the milestones in `handoff.md`.
