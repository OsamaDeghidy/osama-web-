# OSERA Web E2E Test Infrastructure

This document outlines the testing architecture, commands, configuration, and test case inventory for the OSERA Web application.

---

## 1. Test Runner Command and Invocation

We use **Playwright Test** as the core End-to-End (E2E) testing framework.

### Invocation Commands
- **Run all E2E tests:**
  ```bash
  npm run test:e2e
  ```
  *(Equivalently: `npx playwright test`)*

- **Run a specific spec file:**
  ```bash
  npx playwright test tests/visual-style.spec.ts
  ```

- **Run in headed mode (visible browser):**
  ```bash
  npx playwright test --headed
  ```

- **Run tests and open HTML report:**
  ```bash
  npx playwright show-report
  ```

---

## 2. Test Case Format

Every test case in the suite follows a standardized structured format designed to verify layout, visual style conformance, animations, AI responses, and user conversion journeys.

### Example Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Group Name', () => {
  test('test_feature_tier_description', async ({ page }) => {
    // 1. Arrange (Inputs / Environment / Route Mocks)
    await page.goto('/');

    // 2. Act (User actions: clicks, scrolls, hovers, inputs)
    await page.locator('#element-id').click();

    // 3. Assert (Output verification via computed styles, visibility, content checks)
    const element = page.locator('#result-panel');
    await expect(element).toBeVisible();
  });
});
```

### Verification Channels Used
1. **DOM Structure & Attribute Checks:** Ensures appropriate HTML classes, `id`s, `href` patterns, and accessibility metrics are present.
2. **Computed Style Audits:** Executes evaluations inside the browser context using `window.getComputedStyle(el)` to inspect exact CSS properties (e.g., `backgroundColor`, `color`, `transform`, `transition-delay`).
3. **Mock API Interceptions:** Intercepts routes like `/api/chat` using `page.route()` to verify client-side processing of successful answers or graceful UI error notifications without real-world API dependency bottlenecks.
4. **Viewport Scaling & Emulation:** Checks layout integrity across various breakpoints (mobile, tablet, desktop) and user media preferences (light mode emulations, `prefers-reduced-motion` settings).

---

## 3. Feature Inventory and Tier Breakdown

A total of **71 E2E tests** are distributed across 8 spec files, covering 4 progression tiers:

### Spec Files Summary
| Spec File | Total Tests | Target Verification Scope |
| :--- | :---: | :--- |
| `tests/visual-style.spec.ts` | 10 | Luxury palette (Black/Gold/Platinum), serif/sans typography, no purple/violet/indigo classes, high contrast. |
| `tests/asymmetric-layout.spec.ts` | 10 | Off-center layouts, offset columns, no standard 50/50 splits, mobile responsive collapse. |
| `tests/animations.spec.ts` | 10 | Scroll-triggered opacity entrances, stagger delay patterns, scale/glow on hover, reduced-motion fallbacks. |
| `tests/ai-chatbot.spec.ts` | 10 | Launcher, luxury UI colors, user/model bubble styling separation, error handling, auto-scroll. |
| `tests/lead-conversion.spec.ts` | 10 | WhatsApp CTA buttons, target phone number validation, secure attributes, layout placements. |
| `tests/projects-gallery.spec.ts` | 10 | Asymmetric card col-spans, image object-fits, single/empty/heavy data state fallbacks. |
| `tests/cross-feature.spec.ts` | 6 | CSS transitions with Framer Motion, chatbot theme sync, chatbot triggers recommending WhatsApp. |
| `tests/real-world-scenarios.spec.ts` | 5 | Enterprise user journey, fast scroller stability, pre-filled quote lead flow, mobile conversion. |

---

## 4. Test Case Inventory

### 4.1. Visual Style and Color Palette (`tests/visual-style.spec.ts`)
1. **test_f1_t1_no_purple_classes**: Scan the DOM to ensure no Tailwind purple, violet, or indigo class references exist.
2. **test_f1_t1_gold_accent**: Verify gold/amber accent classes or custom gold hexes exist.
3. **test_f1_t1_platinum_tones**: Verify platinum, slate, or zinc colors are used for body copy.
4. **test_f1_t1_black_background**: Verify outer body/wrapper resolves to a dark/black background color.
5. **test_f1_t1_serif_sans_typography**: Ensure serif headers and sans body typography are present.
6. **test_f1_t2_dark_theme_persistence**: Emulate light-mode preferences and verify the background remains dark.
7. **test_f1_t2_computed_bg_color**: Verify that body computed background color resolves to black/near-black.
8. **test_f1_t2_contrast_ratio_headers**: Verify h1/h2/h3 headers have sufficient luminance relative to the dark background.
9. **test_f1_t2_contrast_ratio_buttons**: Verify CTA text has readable contrast against button backgrounds.
10. **test_f1_t2_responsive_theme_preservation**: Ensure dark theme colors are consistent across mobile, tablet, and desktop viewports.

### 4.2. Asymmetric Layout/Tension (`tests/asymmetric-layout.spec.ts`)
11. **test_f2_t1_no_generic_splits**: Scan hero sections to verify no standard `grid-cols-2` splits are present.
12. **test_f2_t1_asymmetric_ratio**: Verify that columns utilize asymmetric ratios (e.g., span 8/4, 9/3).
13. **test_f2_t1_offset_columns**: Verify grid elements offset dynamically via translations or start positioning.
14. **test_f2_t1_empty_space**: Verify presence of empty placeholder columns/spacers creating layout tension.
15. **test_f2_t1_edge_alignment_bias**: Verify alignment properties biased towards left/right boundaries.
16. **test_f2_t2_responsive_collapse**: Verify layouts collapse cleanly to full width on mobile screens.
17. **test_f2_t2_ultrawide_layout**: Ensure asymmetric ratios are preserved on 2560px+ screen sizes.
18. **test_f2_t2_no_horizontal_overflow**: Verify that page offsets do not trigger horizontal scroll bars.
19. **test_f2_t2_no_text_overlapping**: Ensure no text block boundaries overlap with one another.
20. **test_f2_t2_off_center_cta_alignment**: Verify the main hero CTA aligns off-center.

### 4.3. Animations and Micro-interactions (`tests/animations.spec.ts`)
21. **test_f3_t1_scroll_entrance**: Verify scroll-animated elements start with opacity 0 or offsets.
22. **test_f3_t1_staggered_delays**: Verify delay styles exist inside page list flows.
23. **test_f3_t1_hover_scale**: Verify that buttons or cards scale up when hovered.
24. **test_f3_t1_hover_glow**: Verify that buttons apply glow effects/shadow changes on hover.
25. **test_f3_t1_framer_motion_tags**: Verify presence of Framer Motion tags or inline transition styles.
26. **test_f3_t2_reduced_motion**: Verify that browsers with prefers-reduced-motion fall back to instant transitions.
27. **test_f3_t2_rapid_hover**: Verify that hover in/out sequences do not trap components in hovered scale states.
28. **test_f3_t2_scroll_retrigger**: Verify stability of layout properties when scrolling down and up.
29. **test_f3_t2_glow_size_limits**: Ensure hover box-shadow sizes do not exceed reasonable boundaries.
30. **test_f3_t2_animation_interruption**: Verify button clicks are not blocked mid-hover animation.

### 4.4. AI Chatbot Interface (`tests/ai-chatbot.spec.ts`)
31. **test_f4_t1_chat_visibility**: Verify launcher button opens the chat history pane.
32. **test_f4_t1_luxury_chat_colors**: Ensure chatbot panel matches dark theme and avoids purple styles.
33. **test_f4_t1_chat_inputs**: Verify input field and submit buttons are active and visible.
34. **test_f4_t1_founder_mention**: Verify that welcome/suggested chat messages mention Osama or OSERA.
35. **test_f4_t1_message_bubbles**: Verify layout differences between user and model messages.
36. **test_f4_t2_empty_submit**: Verify that spaces or empty submissions do not post new messages.
37. **test_f4_t2_long_input**: Ensure massive text inputs do not overflow or distort the input panel width/height.
38. **test_f4_t2_history_persistence**: Verify that closing and reopening the drawer preserves recent conversation.
39. **test_f4_t2_error_handling**: Mock API failures and check if the chatbot alerts the user gracefully.
40. **test_f4_t2_auto_scroll**: Verify scroll position automatically snaps to the bottom as new messages arrive.

### 4.5. Lead Conversion (`tests/lead-conversion.spec.ts`)
41. **test_f5_t1_button_visibility**: Verify WhatsApp CTA buttons are present and visible on screen.
42. **test_f5_t1_link_pattern**: Ensure links direct traffic using valid `https://wa.me/` URLs.
43. **test_f5_t1_wa_phone_number**: Verify phone number `201066906132` is targeted.
44. **test_f5_t1_luxury_wa_colors**: Verify WhatsApp buttons match luxury color schemes rather than bright brand greens.
45. **test_f5_t1_link_attributes**: Verify links include security parameters: `target="_blank"` and `rel="noopener noreferrer"`.
46. **test_f5_t2_multiple_links**: Verify availability of at least 2 distinct WhatsApp entry points.
47. **test_f5_t2_mobile_layout**: Ensure mobile views scale and align WhatsApp buttons correctly.
48. **test_f5_t2_button_contrast**: Verify that text inside/next to the button satisfies contrast guidelines.
49. **test_f5_t2_hover_microinteraction**: Verify hover scaling of WhatsApp contact buttons.
50. **test_f5_t2_tracking_params**: Verify link query text coordinates exist.

### 4.6. Projects Gallery (`tests/projects-gallery.spec.ts`)
51. **test_f6_t1_asymmetric_grid**: Verify that cards in the gallery use asymmetrical grid col spans (1 and 2).
52. **test_f6_t1_card_details**: Check that cards render Category, Title, and Description fields.
53. **test_f6_t1_luxury_styling**: Check that borders and fonts match the luxury theme.
54. **test_f6_t1_grid_tension_gaps**: Check that the grid gap styles project tension offsets.
55. **test_f6_t1_link_navigation**: Verify that links to live projects are set.
56. **test_f6_t2_no_projects**: Verify fallback layouts when profile projects array is empty.
57. **test_f6_t2_single_project**: Verify layout and card count when profile project data contains exactly 1 entry.
58. **test_f6_t2_heavy_data**: Ensure the layout does not break when populated with 25+ cards.
59. **test_f6_t2_card_overlays**: Verify hover transitions on card overlays.
60. **test_f6_t2_image_aspect_ratios**: Ensure image layout elements use correct object-fit properties.

### 4.7. Cross-Feature Combinations (`tests/cross-feature.spec.ts`)
61. **test_f1_f3_style_animation_transition**: Verify CSS transitions operate cleanly next to Framer Motion values.
62. **test_f2_f6_layout_gallery_tension**: Ensure gallery grid offset lines match the broader asymmetric layout splits.
63. **test_f4_f1_chatbot_theme_integration**: Ensure opened chatbot input font properties align with page settings.
64. **test_f5_f4_chat_leads_conversion**: Verify that pricing questions trigger chatbot replies containing WhatsApp links.
65. **test_f3_f6_gallery_scroll_animation**: Verify gallery cards use delay parameters.
66. **test_f5_f2_lead_asymmetric_placement**: Verify WhatsApp buttons are positioned off-center.

### 4.8. Real-World Scenarios (`tests/real-world-scenarios.spec.ts`)
67. **test_scenario_enterprise_user_journey**: Full scroll + project view + chatbot query + WhatsApp click.
68. **test_scenario_fast_scroller_journey**: Rapid scrolling check for layout shifts and float CTA visibility.
69. **test_scenario_quote_lead_journey**: Click suggestion chip to open chat pre-populated with inquiry, leading to WhatsApp suggestion.
70. **test_scenario_accessibility_no_motion_journey**: Reduced motion media emulations bypass scroll transitions.
71. **test_scenario_mobile_conversion_journey**: Single column mobile collapsing, chatbot interaction, and conversion.
