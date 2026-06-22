import { test, expect } from '@playwright/test';

test.describe('Real-World User Journeys', () => {
  test('test_scenario_enterprise_user_journey: end-to-end flow for enterprise users', async ({ page }) => {
    // Mock chat API response
    await page.route('/api/chat', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ text: 'Enterprise response: Here is the WhatsApp link https://wa.me/201066906132' }),
      });
    });

    // 1. Navigate to home
    await page.goto('/');

    // 2. Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(200);

    // 3. Switch to Projects / Sandbox tab
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    await expect(page.locator('div[class*="border-amber-900/20"]').first()).toBeVisible();

    // 4. Open chat assistant
    await page.locator('#osera-chat-launcher').click();
    await expect(page.locator('#osera-chat-panel')).toBeVisible();

    // 5. Send query
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill('Enterprise query');
    await page.locator('#osera-chat-panel button[type="submit"]').click();
    
    // 6. Click WhatsApp link in chat panel
    const waLink = page.locator('#osera-chat-panel a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
  });

  test('test_scenario_fast_scroller_journey: fast scroll down check for shift and CTA', async ({ page }) => {
    await page.goto('/');
    
    // Scroll immediately to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Check no horizontal overflow
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasOverflow).toBe(false);

    // Check floating WhatsApp launcher/button is visible
    const launcher = page.locator('#osera-chat-launcher');
    await expect(launcher).toBeVisible();
  });

  test('test_scenario_quote_lead_journey: quote flow leading to WhatsApp redirect recommendation', async ({ page }) => {
    await page.route('/api/chat', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ text: 'WhatsApp link: https://wa.me/201066906132' }),
      });
    });

    await page.goto('/');
    
    // Click suggested prompt quick chip
    const chip = page.locator('button:has-text("Optimize"), button:has-text("Django"), button:has-text("استعلامات")').first();
    await chip.click();

    // Chatbot panel should open
    await expect(page.locator('#osera-chat-panel')).toBeVisible();

    // Wait for the response showing the WhatsApp link
    const waLink = page.locator('#osera-chat-panel a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
  });

  test('test_scenario_accessibility_no_motion_journey: prefers-reduced-motion visibility and fallback', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check sections are fully visible (opacity should not be 0)
    const opacity = await page.locator('section').first().evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeGreaterThan(0.5);
  });

  test('test_scenario_mobile_conversion_journey: mobile viewport conversion flow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify asymmetric sections collapse to single column (e.g. elements take full width)
    const container = page.locator('header').first();
    const width = await container.evaluate(el => el.getBoundingClientRect().width);
    expect(width).toBeLessThanOrEqual(375);

    // Open chat
    await page.locator('#osera-chat-launcher').click();
    await expect(page.locator('#osera-chat-panel')).toBeVisible();

    // Convert via WhatsApp CTA in chat
    const waLink = page.locator('#osera-chat-panel a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
  });
});
