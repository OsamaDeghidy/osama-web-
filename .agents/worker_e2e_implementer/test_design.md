# E2E Test Case Specifications (71 Tests)

This document lists all 71 required test cases across the 4 tiers for the 6 core features. Write these test cases inside the `tests/` folder in the respective spec files.

---

## 1. Visual Style and Color Palette (`tests/visual-style.spec.ts`)
Verify Black/Gold/Platinum luxury palette, Serif/Sans fonts, and ensure NO purple/violet/indigo.

### Tier 1: Feature Coverage (5 Tests)
1. **test_f1_t1_no_purple_classes**: Scan the entire page DOM classes to verify that no element contains Tailwind classes referencing `purple`, `violet`, or `indigo` (e.g., `text-purple-500`, `bg-indigo-600`).
2. **test_f1_t1_gold_accent**: Verify the presence of gold/amber styling. Check that elements like titles or CTA borders contain gold/amber classes (e.g., `text-amber-500`, `border-gold`, etc.) or custom hex gold.
3. **test_f1_t1_platinum_tones**: Verify that platinum/slate/neutral colors are used for body text (e.g., `text-zinc-300`, `text-slate-400`).
4. **test_f1_t1_black_background**: Verify that the main outer page wrapper or sections have a dark background (e.g., `bg-black`, `bg-zinc-950`, `bg-neutral-950`).
5. **test_f1_t1_serif_sans_typography**: Verify that serif headers (e.g., `font-serif`) and sans body text (e.g., `font-sans`) are utilized on the main page.

### Tier 2: Boundary & Corner Cases (5 Tests)
6. **test_f1_t2_dark_theme_persistence**: Verify that even if system preferences mock standard styles, the main background remains dark and does not dynamically toggle to a generic light theme.
7. **test_f1_t2_computed_bg_color**: Verify the computed style background-color of the body or main element resolves to true dark/black (rgb/rgba representing black/near-black).
8. **test_f1_t2_contrast_ratio_headers**: Verify that main headers have high contrast relative to the dark background.
9. **test_f1_t2_contrast_ratio_buttons**: Verify that primary CTA text (gold or platinum) on buttons has readable contrast.
10. **test_f1_t2_responsive_theme_preservation**: Verify theme colors remain consistent on mobile, tablet, and desktop viewports.

---

## 2. Asymmetric Layout/Tension (`tests/asymmetric-layout.spec.ts`)
Verify layout tension, off-center positioning, and lack of standard 50/50 splits.

### Tier 1: Feature Coverage (5 Tests)
11. **test_f2_t1_no_generic_splits**: Scan the page layout to verify that the Hero section does not use `grid-cols-2`, flex-row with equal split widths, or standard 50/50 layout splits.
12. **test_f2_t1_asymmetric_ratio**: Verify that splits utilize asymmetric ratios (e.g. `col-span-8` / `col-span-4`, `col-span-9` / `col-span-3`, or off-center flex layouts).
13. **test_f2_t1_offset_columns**: Verify that horizontal grid/flex boundaries are offset dynamically, creating visual tension.
14. **test_f2_t1_empty_space**: Verify that there is at least one section or grid area containing empty placeholder content (e.g., left/right empty columns) to project tension.
15. **test_f2_t1_edge_alignment_bias**: Verify that core page components are pushed aggressively to one edge (e.g., left-biased or right-biased alignments).

### Tier 2: Boundary & Corner Cases (5 Tests)
16. **test_f2_t2_responsive_collapse**: Verify that on mobile screens, the asymmetric layout collapses gracefully without text overflow or clipping off-screen.
17. **test_f2_t2_ultrawide_layout**: Verify that on extremely wide screens, layout maintains its asymmetric split rather than standard centering.
18. **test_f2_t2_no_horizontal_overflow**: Verify that asymmetric offsets or margins do not trigger horizontal scroll bars.
19. **test_f2_t2_no_text_overlapping**: Verify that asymmetric spacing does not lead to text blocks overlapping each other.
20. **test_f2_t2_off_center_cta_alignment**: Verify that the primary hero call-to-action button is aligned with the offset grid rather than centered.

---

## 3. Animations and Micro-interactions (`tests/animations.spec.ts`)
Verify Framer Motion integration, scroll animations, stagger entrances, hover scale/glow.

### Tier 1: Feature Coverage (5 Tests)
21. **test_f3_t1_scroll_entrance**: Verify that scroll-animated sections are initially hidden (opacity 0) or offset before trigger/intersection.
22. **test_f3_t1_staggered_delays**: Verify that parent lists or child elements have incremental animation delays (e.g., stagger effects).
23. **test_f3_t1_hover_scale**: Verify that hover-trigger elements (like buttons or cards) scale up on hover.
24. **test_f3_t1_hover_glow**: Verify that hover-trigger elements apply shadows or glow colors (e.g. gold drop shadow) on hover.
25. **test_f3_t1_framer_motion_tags**: Verify that standard Framer Motion animation attributes or layout-wrapper elements are present.

### Tier 2: Boundary & Corner Cases (5 Tests)
26. **test_f3_t2_reduced_motion**: Verify that if a user has `prefers-reduced-motion` enabled, standard page elements still render and animate appropriately (e.g. fallback instantly without lag).
27. **test_f3_t2_rapid_hover**: Hover in and out of interactive elements rapidly to ensure scale/glow doesn't get stuck in a wrong state.
28. **test_f3_t2_scroll_retrigger**: Verify that scrolling up and down either resets/retriggers or maintains stability cleanly.
29. **test_f3_t2_glow_size_limits**: Verify that glow box-shadow sizes remain within aesthetic bounds and don't expand infinitely.
30. **test_f3_t2_animation_interruption**: Verify that elements can be clicked or interacted with mid-animation without blocking inputs.

---

## 4. AI Chatbot Interface (`tests/ai-chatbot.spec.ts`)
Verify chatbot panel, input, themes, suggestions, and responses.

### Tier 1: Feature Coverage (5 Tests)
31. **test_f4_t1_chat_visibility**: Verify the chatbot widget exists and opening it displays the message history panel.
32. **test_f4_t1_luxury_chat_colors**: Verify that the chatbot UI matches the luxury gold/black/platinum color scheme and contains no purple.
33. **test_f4_t1_chat_inputs**: Verify that the text input is present and the submit button is visible and active.
34. **test_f4_t1_founder_mention**: Verify that chat suggestions or text prompt instructions reference OSERA/Osama.
35. **test_f4_t1_message_bubbles**: Verify that message bubbles are rendered and distinguish between user and AI messages.

### Tier 2: Boundary & Corner Cases (5 Tests)
36. **test_f4_t2_empty_submit**: Verify that submitting an empty chat message does not post any new messages to the message list.
37. **test_f4_t2_long_input**: Verify that entering a long prompt does not distort the input box layout or break the wrapper.
38. **test_f4_t2_history_persistence**: Verify that closing the chatbot panel and reopening it preserves previous message history.
39. **test_f4_t2_error_handling**: Mock a chat endpoint error and verify that the UI shows a graceful error notification without crashing.
40. **test_f4_t2_auto_scroll**: Verify that sending/receiving messages triggers auto-scroll to the bottom of the chat pane.

---

## 5. Lead Conversion (`tests/lead-conversion.spec.ts`)
Verify WhatsApp contact buttons, URLs, and theme conformance.

### Tier 1: Feature Coverage (5 Tests)
41. **test_f5_t1_button_visibility**: Verify WhatsApp conversion buttons are prominent (floating button or headers/CTAs).
42. **test_f5_t1_link_pattern**: Verify that all WhatsApp buttons point to a valid WhatsApp link format (`https://wa.me/...`).
43. **test_f5_t1_wa_phone_number**: Verify that the link references the founder's phone number (`201066906132`).
44. **test_f5_t1_luxury_wa_colors**: Verify that the WhatsApp button conforms to the Gold/Platinum/Black scheme (no bright green default button that breaks the luxury dark mode layout).
45. **test_f5_t1_link_attributes**: Verify that WhatsApp links include `target="_blank"` and `rel="noopener noreferrer"` attributes.

### Tier 2: Boundary & Corner Cases (5 Tests)
46. **test_f5_t2_multiple_links**: Verify that multiple WhatsApp conversion endpoints are placed across different sections (e.g. Hero, Chat, Footer).
47. **test_f5_t2_mobile_layout**: Verify that the floating WhatsApp button adjusts positions or styling gracefully on mobile screens.
48. **test_f5_t2_button_contrast**: Verify that text inside/next to the WhatsApp button remains readable under dark theme contrast constraints.
49. **test_f5_t2_hover_microinteraction**: Verify that WhatsApp buttons scale or change glow on hover.
50. **test_f5_t2_tracking_params**: Verify that links contain structured query parameters if configured, or default safely.

---

## 6. Projects Gallery (`tests/projects-gallery.spec.ts`)
Verify asymmetric editorial grid and project card detail elements.

### Tier 1: Feature Coverage (5 Tests)
51. **test_f6_t1_asymmetric_grid**: Verify that the projects grid doesn't use uniform equal grids, displaying cards in an asymmetric/offset format.
52. **test_f6_t1_card_details**: Verify that each project card displays a Title, Category, and Description.
53. **test_f6_t1_luxury_styling**: Verify that card borders, backgrounds, and text use the luxury palette.
54. **test_f6_t1_grid_tension_gaps**: Verify that there are spacing and grid alignments that produce asymmetrical negative space.
55. **test_f6_t1_link_navigation**: Verify that card CTA links or direct card links exist.

### Tier 2: Boundary & Corner Cases (5 Tests)
56. **test_f6_t2_no_projects**: Verify that if no projects are provided, the gallery renders a clean placeholder message or fallback layout.
57. **test_f6_t2_single_project**: Verify that a single project card maintains correct styling and layout alignments.
58. **test_f6_t2_heavy_data**: Verify that listing many projects loads cleanly without layout breaks.
59. **test_f6_t2_card_overlays**: Verify that hovered project card details overlap cleanly without visual clipping.
60. **test_f6_t2_image_aspect_ratios**: Verify that project images are scaled using object-fit properties to avoid stretching.

---

## 7. Cross-Feature Combinations (`tests/cross-feature.spec.ts`)
Verify combinations of features (Tier 3).

61. **test_f1_f3_style_animation_transition**: Verify that hover styles (glow/scale) transition smoothly using CSS transitions alongside Framer Motion.
62. **test_f2_f6_layout_gallery_tension**: Verify that the asymmetric gallery grid maintains structural visual offsets relative to the main layout split.
63. **test_f4_f1_chatbot_theme_integration**: Verify that when the chatbot drawer is opened, its fonts, input fields, and message areas strictly match the global luxury gold/platinum styling.
64. **test_f5_f4_chat_leads_conversion**: Verify that typing "price" or "hire" in the AI chatbot returns a message recommending WhatsApp contact containing a valid wa.me link.
65. **test_f3_f6_gallery_scroll_animation**: Verify that scrolling down triggers stagger entrances on the projects gallery cards.
66. **test_f5_f2_lead_asymmetric_placement**: Verify that WhatsApp CTAs are placed off-center, adhering to the asymmetric grid lines.

---

## 8. Real-World Scenarios (`tests/real-world-scenarios.spec.ts`)
Verify integrated user journeys (Tier 4).

67. **test_scenario_enterprise_user_journey**:
    - Navigate to home page.
    - Scroll down, verify sections stagger animate.
    - Inspect a project card in the asymmetric gallery.
    - Open the AI Chat assistant, type a query, and verify it replies.
    - Click a WhatsApp button in the chatbot or footer.
68. **test_scenario_fast_scroller_journey**:
    - Load the page.
    - Scroll immediately to the bottom.
    - Verify layout does not shift and no horizontal overflows are present.
    - Verify floating WhatsApp CTA is visible and clickable.
69. **test_scenario_quote_lead_journey**:
    - Click the primary quote/call-to-action button.
    - Verify this opens the chatbot panel pre-filled with a quote request.
    - Submit the prompt, wait for the recommendation to contact on WhatsApp, and check link validity.
70. **test_scenario_accessibility_no_motion_journey**:
    - Mock reduced-motion preference in the browser context.
    - Load page and verify that all sections are visible instantly (opacity 1) without requiring scroll-triggers.
71. **test_scenario_mobile_conversion_journey**:
    - Set mobile viewport size (e.g. iPhone 12).
    - Navigate to page.
    - Verify asymmetric sections collapse to single column cleanly.
    - Interact with chat and convert via a WhatsApp CTA.
