# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: animations.spec.ts >> Animations and Micro-interactions >> test_f3_t1_hover_scale: verify hover scale effect on buttons/cards
- Location: tests\animations.spec.ts:33:3

# Error details

```
Error: No button/link found to test scale hover
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Animations and Micro-interactions', () => {
  4   |   test('test_f3_t1_scroll_entrance: verify scroll-animated elements start with offset/opacity 0', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     const startsHidden = await page.evaluate(() => {
  7   |       // Find scroll-animated sections
  8   |       const sections = Array.from(document.querySelectorAll('section, div.motion-section'));
  9   |       return sections.some(sec => {
  10  |         const style = window.getComputedStyle(sec);
  11  |         const opacity = parseFloat(style.opacity);
  12  |         const transform = style.transform;
  13  |         return opacity === 0 || transform.includes('matrix');
  14  |       });
  15  |     });
  16  |     // This could fail baseline but the logic is correct
  17  |     expect(startsHidden).toBe(true);
  18  |   });
  19  | 
  20  |   test('test_f3_t1_staggered_delays: verify stagger delay patterns exist in styling or motion structures', async ({ page }) => {
  21  |     await page.goto('/');
  22  |     const hasStagger = await page.evaluate(() => {
  23  |       const items = Array.from(document.querySelectorAll('*'));
  24  |       return items.some(el => {
  25  |         const transitionDelay = window.getComputedStyle(el).transitionDelay;
  26  |         const animationDelay = window.getComputedStyle(el).animationDelay;
  27  |         return (transitionDelay && transitionDelay !== '0s') || (animationDelay && animationDelay !== '0s');
  28  |       });
  29  |     });
  30  |     expect(hasStagger).toBe(true);
  31  |   });
  32  | 
  33  |   test('test_f3_t1_hover_scale: verify hover scale effect on buttons/cards', async ({ page }) => {
  34  |     await page.goto('/');
  35  |     const button = page.locator('button, a.border').first();
  36  |     if (await button.count() > 0) {
  37  |       const scaleBefore = await button.evaluate(el => window.getComputedStyle(el).transform);
  38  |       await button.hover();
  39  |       // wait a moment for spring transition
  40  |       await page.waitForTimeout(200);
  41  |       const scaleAfter = await button.evaluate(el => window.getComputedStyle(el).transform);
  42  |       expect(scaleAfter).not.toBe(scaleBefore);
  43  |     } else {
> 44  |       throw new Error('No button/link found to test scale hover');
      |             ^ Error: No button/link found to test scale hover
  45  |     }
  46  |   });
  47  | 
  48  |   test('test_f3_t1_hover_glow: verify hover glow box-shadow effect', async ({ page }) => {
  49  |     await page.goto('/');
  50  |     const button = page.locator('button, a.border').first();
  51  |     if (await button.count() > 0) {
  52  |       const shadowBefore = await button.evaluate(el => window.getComputedStyle(el).boxShadow);
  53  |       await button.hover();
  54  |       await page.waitForTimeout(200);
  55  |       const shadowAfter = await button.evaluate(el => window.getComputedStyle(el).boxShadow);
  56  |       expect(shadowAfter).not.toBe(shadowBefore);
  57  |     } else {
  58  |       throw new Error('No button/link found to test glow hover');
  59  |     }
  60  |   });
  61  | 
  62  |   test('test_f3_t1_framer_motion_tags: verify Framer Motion properties or custom style tags', async ({ page }) => {
  63  |     await page.goto('/');
  64  |     const hasMotion = await page.evaluate(() => {
  65  |       const allElements = Array.from(document.querySelectorAll('*'));
  66  |       return allElements.some(el => {
  67  |         // Framer Motion puts inline styles like transform-origin, will-change, or data attributes
  68  |         const style = el.getAttribute('style') || '';
  69  |         return style.includes('will-change') || style.includes('transform') || style.includes('opacity');
  70  |       });
  71  |     });
  72  |     expect(hasMotion).toBe(true);
  73  |   });
  74  | 
  75  |   test('test_f3_t2_reduced_motion: verify prefers-reduced-motion media query fallback', async ({ page }) => {
  76  |     await page.emulateMedia({ reducedMotion: 'reduce' });
  77  |     await page.goto('/');
  78  |     const reducedMotionApplied = await page.evaluate(() => {
  79  |       // With reduced motion, durations should be 0s or instantaneous
  80  |       const sections = Array.from(document.querySelectorAll('section'));
  81  |       return sections.every(sec => {
  82  |         const style = window.getComputedStyle(sec);
  83  |         return style.transitionDuration === '0s' || style.animationPlayState !== 'running' || style.opacity === '1';
  84  |       });
  85  |     });
  86  |     expect(reducedMotionApplied).toBe(true);
  87  |   });
  88  | 
  89  |   test('test_f3_t2_rapid_hover: verify rapid hover in/out does not lock elements in incorrect scaling state', async ({ page }) => {
  90  |     await page.goto('/');
  91  |     const button = page.locator('button, a.border').first();
  92  |     if (await button.count() > 0) {
  93  |       const scaleInitial = await button.evaluate(el => window.getComputedStyle(el).transform);
  94  |       // Hover in/out rapidly
  95  |       await button.hover();
  96  |       await page.waitForTimeout(50);
  97  |       await page.mouse.move(0, 0);
  98  |       await page.waitForTimeout(50);
  99  |       await button.hover();
  100 |       await page.waitForTimeout(50);
  101 |       await page.mouse.move(0, 0);
  102 |       await page.waitForTimeout(500); // let it settle
  103 |       const scaleFinal = await button.evaluate(el => window.getComputedStyle(el).transform);
  104 |       expect(scaleFinal).toBe(scaleInitial);
  105 |     } else {
  106 |       throw new Error('No button/link found to test rapid hover');
  107 |     }
  108 |   });
  109 | 
  110 |   test('test_f3_t2_scroll_retrigger: verify scroll trigger resets or remains stable on scroll up/down', async ({ page }) => {
  111 |     await page.goto('/');
  112 |     const scrollStable = await page.evaluate(async () => {
  113 |       window.scrollTo(0, 1000);
  114 |       await new Promise(r => setTimeout(r, 200));
  115 |       const opacityDown = parseFloat(window.getComputedStyle(document.body).opacity || '1');
  116 |       window.scrollTo(0, 0);
  117 |       await new Promise(r => setTimeout(r, 200));
  118 |       const opacityUp = parseFloat(window.getComputedStyle(document.body).opacity || '1');
  119 |       return opacityDown === opacityUp;
  120 |     });
  121 |     expect(scrollStable).toBe(true);
  122 |   });
  123 | 
  124 |   test('test_f3_t2_glow_size_limits: verify box shadow sizes remain within aesthetic bounds on hover', async ({ page }) => {
  125 |     await page.goto('/');
  126 |     const button = page.locator('button, a.border').first();
  127 |     if (await button.count() > 0) {
  128 |       await button.hover();
  129 |       await page.waitForTimeout(200);
  130 |       const isWithinBounds = await button.evaluate(el => {
  131 |         const shadow = window.getComputedStyle(el).boxShadow;
  132 |         if (!shadow || shadow === 'none') return true;
  133 |         // Parse blur/spread radius
  134 |         const pxValues = shadow.match(/\d+px/g);
  135 |         if (!pxValues) return true;
  136 |         return pxValues.every(val => parseInt(val) < 100); // glow shouldn't blow up (>100px)
  137 |       });
  138 |       expect(isWithinBounds).toBe(true);
  139 |     } else {
  140 |       throw new Error('No button/link found to test glow bounds');
  141 |     }
  142 |   });
  143 | 
  144 |   test('test_f3_t2_animation_interruption: verify element is clickable mid-animation', async ({ page }) => {
```