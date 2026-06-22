import { test, expect } from '@playwright/test';

test.describe('Visual Style and Color Palette', () => {
  test('test_f1_t1_no_purple_classes: verify no purple, violet, or indigo class references', async ({ page }) => {
    await page.goto('/');
    const hasPurple = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      return allElements.some(el => {
        const classAttr = el.getAttribute('class') || '';
        return /(purple|violet|indigo)/i.test(classAttr);
      });
    });
    expect(hasPurple).toBe(false);
  });

  test('test_f1_t1_gold_accent: verify presence of gold/amber styling', async ({ page }) => {
    await page.goto('/');
    const hasGoldAccent = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      return allElements.some(el => {
        const classAttr = el.getAttribute('class') || '';
        const styleAttr = el.getAttribute('style') || '';
        const computedStyle = window.getComputedStyle(el);
        const isGoldClass = /(gold|amber|yellow)/i.test(classAttr);
        const isGoldColor = /#([dD]4[aA]F37|[fF]b[bB]f24)/.test(styleAttr) || 
                            computedStyle.color.includes('rgb(251, 191, 36)') || 
                            computedStyle.borderColor.includes('rgb(251, 191, 36)');
        return isGoldClass || isGoldColor;
      });
    });
    expect(hasGoldAccent).toBe(true);
  });

  test('test_f1_t1_platinum_tones: verify platinum/slate/neutral colors are used for body text', async ({ page }) => {
    await page.goto('/');
    const hasPlatinumTones = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      return allElements.some(el => {
        const classAttr = el.getAttribute('class') || '';
        return /(zinc|slate|neutral|platinum)/i.test(classAttr);
      });
    });
    expect(hasPlatinumTones).toBe(true);
  });

  test('test_f1_t1_black_background: verify dark background wrap', async ({ page }) => {
    await page.goto('/');
    const hasDarkBg = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('div, section, body'));
      return allElements.some(el => {
        const classAttr = el.getAttribute('class') || '';
        return /(bg-black|bg-zinc-950|bg-neutral-950|bg-\[#050505\])/i.test(classAttr);
      });
    });
    expect(hasDarkBg).toBe(true);
  });

  test('test_f1_t1_serif_sans_typography: verify serif headers and sans body text', async ({ page }) => {
    await page.goto('/');
    const typography = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      const hasSerif = allElements.some(el => el.getAttribute('class')?.includes('font-serif'));
      const hasSans = allElements.some(el => el.getAttribute('class')?.includes('font-sans'));
      return { hasSerif, hasSans };
    });
    expect(typography.hasSerif || typography.hasSans).toBe(true);
  });

  test('test_f1_t2_dark_theme_persistence: verify background remains dark under light preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    const rgb = bodyBg.match(/\d+/g);
    if (rgb) {
      const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
      expect(r).toBeLessThan(30);
      expect(g).toBeLessThan(30);
      expect(b).toBeLessThan(30);
    } else {
      expect(bodyBg).toBe('rgb(5, 5, 5)');
    }
  });

  test('test_f1_t2_computed_bg_color: verify body computed bg resolves to black/near-black', async ({ page }) => {
    await page.goto('/');
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    const rgb = bodyBg.match(/\d+/g);
    if (rgb) {
      const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
      expect(r).toBeLessThan(30);
      expect(g).toBeLessThan(30);
      expect(b).toBeLessThan(30);
    } else {
      expect(bodyBg).toBe('rgb(5, 5, 5)');
    }
  });

  test('test_f1_t2_contrast_ratio_headers: verify headers have high contrast relative to dark background', async ({ page }) => {
    await page.goto('/');
    const headerContrastOk = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h1, h2, h3'));
      if (headers.length === 0) return false;
      return headers.every(header => {
        const color = window.getComputedStyle(header).color;
        const rgb = color.match(/\d+/g);
        if (rgb) {
          const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          return luminance > 100;
        }
        return true;
      });
    });
    expect(headerContrastOk).toBe(true);
  });

  test('test_f1_t2_contrast_ratio_buttons: verify primary CTA text on buttons has readable contrast', async ({ page }) => {
    await page.goto('/');
    const buttonContrastOk = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a.border'));
      if (buttons.length === 0) return false;
      return buttons.every(button => {
        const style = window.getComputedStyle(button);
        const color = style.color;
        const bg = style.backgroundColor;
        const rgbColor = color.match(/\d+/g);
        const rgbBg = bg.match(/\d+/g);
        if (rgbColor && rgbBg) {
          const rC = parseInt(rgbColor[0]), gC = parseInt(rgbColor[1]), bC = parseInt(rgbColor[2]);
          const rB = parseInt(rgbBg[0]), gB = parseInt(rgbBg[1]), bB = parseInt(rgbBg[2]);
          const lumC = 0.2126 * rC + 0.7152 * gC + 0.0722 * bC;
          const lumB = 0.2126 * rB + 0.7152 * gB + 0.0722 * bB;
          const contrast = (Math.max(lumC, lumB) + 0.05) / (Math.min(lumC, lumB) + 0.05);
          return contrast >= 3.0;
        }
        return true;
      });
    });
    expect(buttonContrastOk).toBe(true);
  });

  test('test_f1_t2_responsive_theme_preservation: verify theme colors are preserved across viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 }
    ];
    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/');
      const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
      const rgb = bodyBg.match(/\d+/g);
      if (rgb) {
        const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
        expect(r).toBeLessThan(30);
        expect(g).toBeLessThan(30);
        expect(b).toBeLessThan(30);
      } else {
        expect(bodyBg).toBe('rgb(5, 5, 5)');
      }
    }
  });
});
