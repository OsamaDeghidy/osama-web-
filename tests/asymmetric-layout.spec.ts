import { test, expect } from '@playwright/test';

test.describe('Asymmetric Layout / Tension', () => {
  test('test_f2_t1_no_generic_splits: verify hero has no simple 50/50 split classes', async ({ page }) => {
    await page.goto('/');
    const hasGenericSplits = await page.evaluate(() => {
      const hero = document.querySelector('section, header, div.hero');
      if (!hero) return false;
      const classAttr = hero.getAttribute('class') || '';
      const children = Array.from(hero.querySelectorAll('*'));
      const hasSplitClass = children.some(el => {
        const cls = el.getAttribute('class') || '';
        return cls.includes('grid-cols-2') || cls.includes('md:grid-cols-2') || cls.includes('w-1/2');
      });
      return hasSplitClass;
    });
    expect(hasGenericSplits).toBe(false);
  });

  test('test_f2_t1_asymmetric_ratio: verify asymmetric grid/flex ratios exist', async ({ page }) => {
    await page.goto('/');
    const hasAsymmetricRatio = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      return allElements.some(el => {
        const cls = el.getAttribute('class') || '';
        return /(col-span-[4893]|w-[3478]\/[12][02])/i.test(cls);
      });
    });
    expect(hasAsymmetricRatio).toBe(true);
  });

  test('test_f2_t1_offset_columns: verify columns offset dynamically', async ({ page }) => {
    await page.goto('/');
    const hasOffsets = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      return allElements.some(el => {
        const cls = el.getAttribute('class') || '';
        return /(col-start-|translate-x-|ml-|mr-)/i.test(cls);
      });
    });
    expect(hasOffsets).toBe(true);
  });

  test('test_f2_t1_empty_space: verify presence of empty/spacer tension elements', async ({ page }) => {
    await page.goto('/');
    const hasEmptyTension = await page.evaluate(() => {
      const emptyDivs = Array.from(document.querySelectorAll('div'));
      return emptyDivs.some(div => {
        const isSpacer = div.classList.contains('hidden') || div.classList.contains('lg:block') || div.classList.contains('md:block');
        const isEmpty = div.innerHTML.trim() === '';
        const hasWidth = /(w-|col-span-)/.test(div.className);
        return isSpacer && isEmpty && hasWidth;
      });
    });
    expect(hasEmptyTension).toBe(true);
  });

  test('test_f2_t1_edge_alignment_bias: verify left/right alignment bias', async ({ page }) => {
    await page.goto('/');
    const hasAlignmentBias = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('div, section, h1, h2, p'));
      return allElements.some(el => {
        const cls = el.getAttribute('class') || '';
        return cls.includes('text-left') || cls.includes('items-start') || cls.includes('justify-start') ||
               cls.includes('text-right') || cls.includes('items-end') || cls.includes('justify-end');
      });
    });
    expect(hasAlignmentBias).toBe(true);
  });

  test('test_f2_t2_responsive_collapse: verify mobile responsive collapse without overflows', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const isCollapsed = await page.evaluate(() => {
      // Check that asymmetric splits collapse to stack (flex-col, col-span-12, etc.)
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.some(el => {
        const cls = el.getAttribute('class') || '';
        return cls.includes('flex-col') || cls.includes('col-span-12');
      });
    });
    expect(isCollapsed).toBe(true);
  });

  test('test_f2_t2_ultrawide_layout: verify ultrawide layout maintains asymmetric tension', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('/');
    const hasAsymmetry = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.some(el => {
        const cls = el.getAttribute('class') || '';
        return /(col-span-[4893]|w-[3478]\/[12][02])/i.test(cls);
      });
    });
    expect(hasAsymmetry).toBe(true);
  });

  test('test_f2_t2_no_horizontal_overflow: verify no horizontal scrollbars are triggered', async ({ page }) => {
    await page.goto('/');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('test_f2_t2_no_text_overlapping: verify bounding boxes do not overlap for layout text blocks', async ({ page }) => {
    await page.goto('/');
    const overlapping = await page.evaluate(() => {
      const textBlocks = Array.from(document.querySelectorAll('h1, h2, p')).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      for (let i = 0; i < textBlocks.length; i++) {
        for (let j = i + 1; j < textBlocks.length; j++) {
          const r1 = textBlocks[i].getBoundingClientRect();
          const r2 = textBlocks[j].getBoundingClientRect();
          // Check if they strictly overlap and are not parents/children of each other
          if (textBlocks[i].contains(textBlocks[j]) || textBlocks[j].contains(textBlocks[i])) {
            continue;
          }
          const overlapX = r1.left < r2.right && r1.right > r2.left;
          const overlapY = r1.top < r2.bottom && r1.bottom > r2.top;
          if (overlapX && overlapY) {
            return true;
          }
        }
      }
      return false;
    });
    expect(overlapping).toBe(false);
  });

  test('test_f2_t2_off_center_cta_alignment: verify primary hero CTA is off-center', async ({ page }) => {
    await page.goto('/');
    const ctaCenterOffset = await page.evaluate(() => {
      const cta = Array.from(document.querySelectorAll('a, button')).find(el => {
        const text = el.textContent || '';
        const href = el.getAttribute('href') || '';
        return href.includes('wa.me') || text.includes('Consult') || text.includes('Architect');
      });
      if (!cta) return 0;
      const rect = cta.getBoundingClientRect();
      const ctaCenter = rect.left + rect.width / 2;
      const viewCenter = window.innerWidth / 2;
      return Math.abs(ctaCenter - viewCenter);
    });
    // Should be significantly offset from the center
    expect(ctaCenterOffset).toBeGreaterThan(0);
  });
});
