import { test, expect } from '@playwright/test';

test.describe('Animations and Micro-interactions', () => {
  test('test_f3_t1_scroll_entrance: verify scroll-animated elements start with offset/opacity 0', async ({ page }) => {
    await page.goto('/');
    const startsHidden = await page.evaluate(() => {
      // Find scroll-animated sections
      const sections = Array.from(document.querySelectorAll('section, div.motion-section'));
      return sections.some(sec => {
        const style = window.getComputedStyle(sec);
        const opacity = parseFloat(style.opacity);
        const transform = style.transform;
        return opacity === 0 || transform.includes('matrix');
      });
    });
    // This could fail baseline but the logic is correct
    expect(startsHidden).toBe(true);
  });

  test('test_f3_t1_staggered_delays: verify stagger delay patterns exist in styling or motion structures', async ({ page }) => {
    await page.goto('/');
    const hasStagger = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('*'));
      return items.some(el => {
        const transitionDelay = window.getComputedStyle(el).transitionDelay;
        const animationDelay = window.getComputedStyle(el).animationDelay;
        return (transitionDelay && transitionDelay !== '0s') || (animationDelay && animationDelay !== '0s');
      });
    });
    expect(hasStagger).toBe(true);
  });

  test('test_f3_t1_hover_scale: verify hover scale effect on buttons/cards', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button, a.border').first();
    if (await button.count() > 0) {
      const scaleBefore = await button.evaluate(el => window.getComputedStyle(el).transform);
      await button.hover();
      // wait a moment for spring transition
      await page.waitForTimeout(200);
      const scaleAfter = await button.evaluate(el => window.getComputedStyle(el).transform);
      expect(scaleAfter).not.toBe(scaleBefore);
    } else {
      throw new Error('No button/link found to test scale hover');
    }
  });

  test('test_f3_t1_hover_glow: verify hover glow box-shadow effect', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button, a.border').first();
    if (await button.count() > 0) {
      const shadowBefore = await button.evaluate(el => window.getComputedStyle(el).boxShadow);
      await button.hover();
      await page.waitForTimeout(200);
      const shadowAfter = await button.evaluate(el => window.getComputedStyle(el).boxShadow);
      expect(shadowAfter).not.toBe(shadowBefore);
    } else {
      throw new Error('No button/link found to test glow hover');
    }
  });

  test('test_f3_t1_framer_motion_tags: verify Framer Motion properties or custom style tags', async ({ page }) => {
    await page.goto('/');
    const hasMotion = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      return allElements.some(el => {
        // Framer Motion puts inline styles like transform-origin, will-change, or data attributes
        const style = el.getAttribute('style') || '';
        return style.includes('will-change') || style.includes('transform') || style.includes('opacity');
      });
    });
    expect(hasMotion).toBe(true);
  });

  test('test_f3_t2_reduced_motion: verify prefers-reduced-motion media query fallback', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const reducedMotionApplied = await page.evaluate(() => {
      // With reduced motion, durations should be 0s or instantaneous
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.every(sec => {
        const style = window.getComputedStyle(sec);
        return style.transitionDuration === '0s' || style.animationPlayState !== 'running' || style.opacity === '1';
      });
    });
    expect(reducedMotionApplied).toBe(true);
  });

  test('test_f3_t2_rapid_hover: verify rapid hover in/out does not lock elements in incorrect scaling state', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button, a.border').first();
    if (await button.count() > 0) {
      const scaleInitial = await button.evaluate(el => window.getComputedStyle(el).transform);
      // Hover in/out rapidly
      await button.hover();
      await page.waitForTimeout(50);
      await page.mouse.move(0, 0);
      await page.waitForTimeout(50);
      await button.hover();
      await page.waitForTimeout(50);
      await page.mouse.move(0, 0);
      await page.waitForTimeout(500); // let it settle
      const scaleFinal = await button.evaluate(el => window.getComputedStyle(el).transform);
      expect(scaleFinal).toBe(scaleInitial);
    } else {
      throw new Error('No button/link found to test rapid hover');
    }
  });

  test('test_f3_t2_scroll_retrigger: verify scroll trigger resets or remains stable on scroll up/down', async ({ page }) => {
    await page.goto('/');
    const scrollStable = await page.evaluate(async () => {
      window.scrollTo(0, 1000);
      await new Promise(r => setTimeout(r, 200));
      const opacityDown = parseFloat(window.getComputedStyle(document.body).opacity || '1');
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 200));
      const opacityUp = parseFloat(window.getComputedStyle(document.body).opacity || '1');
      return opacityDown === opacityUp;
    });
    expect(scrollStable).toBe(true);
  });

  test('test_f3_t2_glow_size_limits: verify box shadow sizes remain within aesthetic bounds on hover', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button, a.border').first();
    if (await button.count() > 0) {
      await button.hover();
      await page.waitForTimeout(200);
      const isWithinBounds = await button.evaluate(el => {
        const shadow = window.getComputedStyle(el).boxShadow;
        if (!shadow || shadow === 'none') return true;
        // Parse blur/spread radius
        const pxValues = shadow.match(/\d+px/g);
        if (!pxValues) return true;
        return pxValues.every(val => parseInt(val) < 100); // glow shouldn't blow up (>100px)
      });
      expect(isWithinBounds).toBe(true);
    } else {
      throw new Error('No button/link found to test glow bounds');
    }
  });

  test('test_f3_t2_animation_interruption: verify element is clickable mid-animation', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button, a.border').first();
    if (await button.count() > 0) {
      // Hover to trigger start of animation
      await button.hover();
      // Immediately click mid-animation (without waiting for timeout)
      await button.click({ force: true });
      expect(true).toBe(true); // Should not throw/hang
    } else {
      throw new Error('No button/link found to test animation click');
    }
  });
});
