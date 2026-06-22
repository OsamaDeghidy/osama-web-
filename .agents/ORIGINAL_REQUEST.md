# Original User Request

## Initial Request — 2026-06-22T01:11:09Z

# Teamwork Project Prompt

A highly professional, modern web portfolio and AI agent interface for OSERA. The design must target large enterprises and institutions, projecting an image of extreme luxury, power, and technical superiority without falling into common SaaS templates.

Working directory: c:\work\apps\osera web
Integrity mode: demo

## Requirements

### R1. Visual Architecture: Asymmetric Tension
The layout must fundamentally break standard grid predictability (e.g., standard split screens or centered hero sections). Utilize extreme asymmetrical layouts (e.g., 90/10 split) where primary elements are aggressively pushed to one edge, leaving massive negative space to project confidence, tension, and power.

### R2. Color Palette & Typography
Use a "Deep Black & Platinum/Gold" color scheme to reflect absolute luxury and power. The PURPLE BAN is in full effect—do not use any purple, violet, or indigo. Typography should use sharp, high-contrast fonts (e.g., strong Serif headers with modern Sans-serif body) to emphasize professionalism.

### R3. Mandatory Active Animation
Integrate fluid, layered animations using Framer Motion. Elements must have scroll-triggered staggered entrances, and interactive elements must have micro-interactions (e.g., scale, subtle glow). Avoid static flat designs.

### R4. Core Content Focus (Conversion & Tech)
1. **AI Chatbot Interface:** Keep the AI assistant elegantly integrated and prominent.
2. **Lead Conversion:** Direct WhatsApp contact buttons must be highly visible and positioned aggressively for conversion.
3. **Projects Gallery:** Display previous works/projects using an asymmetric, editorial-style gallery.

## Acceptance Criteria

### Aesthetic & Layout Verification
- [ ] No "Safe Splits": The code does not use generic `grid-cols-2` or 50/50 splits for the hero section.
- [ ] No Purple: A search through the CSS/Tailwind classes reveals no purple/indigo color references.
- [ ] Animation present: Framer Motion (`framer-motion`) is actively used for page load and scroll animations.
- [ ] Asymmetry: The primary layout pushes core elements to one edge, verified by visual inspection or an agent-as-judge audit based on the `frontend-specialist` Maestro rules.

### Feature Verification
- [ ] WhatsApp conversion buttons are present and easily accessible.
- [ ] The AI Chat interface is maintained and styled according to the new Luxury/Power theme.
- [ ] An asymmetric gallery section is implemented.
