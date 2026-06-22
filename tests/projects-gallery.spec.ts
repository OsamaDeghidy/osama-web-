import { test, expect } from '@playwright/test';

test.describe('Projects Gallery', () => {
  test('test_f6_t1_asymmetric_grid: verify gallery uses asymmetric column spans', async ({ page }) => {
    await page.goto('/');
    // Switch to Sandbox / Projects tab
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const hasAsymmetricSpans = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div[class*="col-span-"]'));
      const spanClasses = cards.map(c => c.className).filter(c => c.includes('col-span-'));
      // Verify both col-span-2 and col-span-1 (or other asymmetric variations) exist
      const hasSpan1 = spanClasses.some(c => c.includes('md:col-span-1') || c.includes('col-span-1'));
      const hasSpan2 = spanClasses.some(c => c.includes('md:col-span-2') || c.includes('col-span-2'));
      return hasSpan1 && hasSpan2;
    });
    expect(hasAsymmetricSpans).toBe(true);
  });

  test('test_f6_t1_card_details: verify cards render title, category, and description', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const card = page.locator('div[class*="border-amber-900/20"]').first();
    await expect(card).toBeVisible();
    // Check elements exist inside card
    await expect(card.locator('span[class*="font-mono"]')).toBeVisible(); // Category
    await expect(card.locator('h4')).toBeVisible(); // Title
    await expect(card.locator('p')).toBeVisible(); // Description
  });

  test('test_f6_t1_luxury_styling: verify cards use black/gold/platinum luxury theme', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const card = page.locator('div[class*="border-amber-900/20"]').first();
    const classes = await card.evaluate(el => el.className);
    expect(classes).not.toMatch(/(purple|violet|indigo)/i);
    // Check luxury gold accents (e.g. amber)
    expect(classes).toMatch(/(amber|gold|zinc|stone|black)/i);
  });

  test('test_f6_t1_grid_tension_gaps: verify asymmetrical spacing gaps exist in gallery grid', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const hasGapsAndOffsets = await page.evaluate(() => {
      const grid = document.querySelector('div[class*="grid"]');
      if (!grid) return false;
      const classAttr = grid.getAttribute('class') || '';
      return classAttr.includes('gap-6') || classAttr.includes('gap-8') || classAttr.includes('auto-rows-');
    });
    expect(hasGapsAndOffsets).toBe(true);
  });

  test('test_f6_t1_link_navigation: verify card navigation links are set', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const cardLink = page.locator('a[href*="http"]').first();
    await expect(cardLink).toBeVisible();
    const href = await cardLink.getAttribute('href');
    expect(href).toMatch(/^https?:\/\//);
  });

  test('test_f6_t2_no_projects: verify gallery fallback layout when projects data is empty', async ({ page }) => {
    await page.goto('/');
    // Mock local storage to empty profile projects
    await page.evaluate(() => {
      const emptyProfile = { liveProjects: [] };
      localStorage.setItem('osera_corporate_profile', JSON.stringify(emptyProfile));
    });
    await page.reload();
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const fallbackText = await page.locator('body').innerText();
    // Fallback or gallery header should still render cleanly
    expect(fallbackText).toContain('OSERA');
  });

  test('test_f6_t2_single_project: verify correct styling and dimensions with a single card', async ({ page }) => {
    await page.goto('/');
    // Mock single project in profile
    await page.evaluate(() => {
      const singleProfile = {
        liveProjects: [{ title: 'Single Core System', category: 'Backend', descEn: 'Single project test', url: 'https://osera-ai.com' }]
      };
      localStorage.setItem('osera_corporate_profile', JSON.stringify(singleProfile));
    });
    await page.reload();
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const cardCount = await page.locator('div[class*="border-amber-900/20"]').count();
    expect(cardCount).toBe(1);
  });

  test('test_f6_t2_heavy_data: verify gallery loads cleanly with 20+ project cards', async ({ page }) => {
    await page.goto('/');
    // Mock 25 projects in profile
    await page.evaluate(() => {
      const manyProjects = Array.from({ length: 25 }, (_, i) => ({
        title: `Scale System ${i}`,
        category: 'Enterprise Core',
        descEn: `Load test project number ${i}`,
        url: 'https://osera-ai.com'
      }));
      const heavyProfile = { liveProjects: manyProjects };
      localStorage.setItem('osera_corporate_profile', JSON.stringify(heavyProfile));
    });
    await page.reload();
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    // Check that at least 20 cards are rendered
    const cardCount = await page.locator('div[class*="border-amber-900/20"]').count();
    expect(cardCount).toBeGreaterThanOrEqual(20);
  });

  test('test_f6_t2_card_overlays: verify hover overlays and scale transitions work cleanly', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const card = page.locator('div[class*="border-amber-900/20"]').first();
    const transformBefore = await card.evaluate(el => window.getComputedStyle(el).transform);
    await card.hover();
    await page.waitForTimeout(200);
    const transformAfter = await card.evaluate(el => window.getComputedStyle(el).transform);
    expect(transformAfter).not.toBe(transformBefore);
  });

  test('test_f6_t2_image_aspect_ratios: verify image elements scale using object-fit properties', async ({ page }) => {
    await page.goto('/');
    // Open Services tab (where images exist)
    await page.locator('button:has-text("Services"), button:has-text("الخدمات")').first().click();
    const images = await page.locator('img[class*="object-"]').all();
    for (const img of images) {
      const objectFit = await img.evaluate(el => window.getComputedStyle(el).objectFit);
      expect(objectFit).toMatch(/(cover|contain|scale-down)/);
    }
  });
});
