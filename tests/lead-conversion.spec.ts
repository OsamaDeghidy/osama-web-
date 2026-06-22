import { test, expect } from '@playwright/test';

test.describe('Lead Conversion (WhatsApp Integration)', () => {
  test('test_f5_t1_button_visibility: verify WhatsApp button CTAs are visible', async ({ page }) => {
    await page.goto('/');
    // Check if any link pointing to wa.me is visible (either in hero, footer, or chat if chat is opened)
    // We can open chatbot to make sure we find one
    await page.locator('#osera-chat-launcher').click();
    const waLink = page.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
  });

  test('test_f5_t1_link_pattern: verify WhatsApp links use valid URL format', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const links = await page.locator('a[href*="wa.me"]').all();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^https:\/\/wa\.me\//);
    }
  });

  test('test_f5_t1_wa_phone_number: verify WhatsApp link references founder phone number', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const links = await page.locator('a[href*="wa.me"]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toContain('201066906132');
    }
  });

  test('test_f5_t1_luxury_wa_colors: verify WhatsApp buttons conform to gold/black/platinum and are not default green', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const waLink = page.locator('a[href*="wa.me"]').first();
    const classes = await waLink.evaluate(el => el.className);
    // WhatsApp button shouldn't use default green styling
    expect(classes).not.toContain('bg-green-500');
    expect(classes).not.toContain('bg-emerald-500'); // except subtle/custom transparent colors if design dictates, but we shouldn't have default bright green
    // We can check computed style background-color is not bright green rgb(37, 211, 102)
    const bg = await waLink.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe('rgb(37, 211, 102)');
  });

  test('test_f5_t1_link_attributes: verify WhatsApp links open in a new tab with security attributes', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const links = await page.locator('a[href*="wa.me"]').all();
    for (const link of links) {
      expect(await link.getAttribute('target')).toBe('_blank');
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('test_f5_t2_multiple_links: verify multiple WhatsApp endpoints across layout tiers', async ({ page }) => {
    await page.goto('/');
    // Check multiple pages/tabs/sections contain wa.me links
    // e.g. open chat first to reveal chat WhatsApp CTAs
    await page.locator('#osera-chat-launcher').click();
    const count = await page.locator('a[href*="wa.me"]').count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('test_f5_t2_mobile_layout: verify mobile layout coordinates for CTA elements', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const waLink = page.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    const rect = await waLink.evaluate(el => el.getBoundingClientRect());
    expect(rect.width).toBeGreaterThan(0);
    expect(rect.height).toBeGreaterThan(0);
  });

  test('test_f5_t2_button_contrast: verify readable text contrast on WhatsApp CTAs', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const waLink = page.locator('a[href*="wa.me"]').first();
    const contrastOk = await waLink.evaluate(el => {
      const style = window.getComputedStyle(el);
      const color = style.color.match(/\d+/g);
      const bg = style.backgroundColor.match(/\d+/g);
      if (color && bg) {
        const lumC = 0.2126 * parseInt(color[0]) + 0.7152 * parseInt(color[1]) + 0.0722 * parseInt(color[2]);
        const lumB = 0.2126 * parseInt(bg[0]) + 0.7152 * parseInt(bg[1]) + 0.0722 * parseInt(bg[2]);
        const contrast = (Math.max(lumC, lumB) + 0.05) / (Math.min(lumC, lumB) + 0.05);
        return contrast >= 3.0;
      }
      return true;
    });
    expect(contrastOk).toBe(true);
  });

  test('test_f5_t2_hover_microinteraction: verify WhatsApp CTA scales/glows on hover', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const waLink = page.locator('a[href*="wa.me"]').first();
    const scaleBefore = await waLink.evaluate(el => window.getComputedStyle(el).transform);
    await waLink.hover();
    await page.waitForTimeout(200);
    const scaleAfter = await waLink.evaluate(el => window.getComputedStyle(el).transform);
    expect(scaleAfter).not.toBe(scaleBefore);
  });

  test('test_f5_t2_tracking_params: verify presence of text parameters on WhatsApp links', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const links = await page.locator('a[href*="wa.me"]').all();
    let hasParams = false;
    for (const link of links) {
      const href = await link.getAttribute('href') || '';
      if (href.includes('text=')) {
        hasParams = true;
      }
    }
    expect(hasParams).toBe(true);
  });
});
