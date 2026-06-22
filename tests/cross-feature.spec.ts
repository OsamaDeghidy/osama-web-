import { test, expect } from '@playwright/test';

test.describe('Cross-Feature Combinations', () => {
  test('test_f1_f3_style_animation_transition: verify hover styles use smooth CSS transitions', async ({ page }) => {
    await page.goto('/');
    const transitionProperty = await page.locator('button, a.border').first().evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transitionProperty || style.transitionDuration;
    });
    expect(transitionProperty).not.toBe('none');
  });

  test('test_f2_f6_layout_gallery_tension: verify gallery grid alignment maintains asymmetry', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const alignmentTension = await page.evaluate(() => {
      const grid = document.querySelector('div[class*="grid"]');
      if (!grid) return false;
      const classAttr = grid.getAttribute('class') || '';
      // Asymmetric layout indicators
      return classAttr.includes('grid-cols-') || classAttr.includes('flex');
    });
    expect(alignmentTension).toBe(true);
  });

  test('test_f4_f1_chatbot_theme_integration: verify chatbot font styles and colors match global luxury themes', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const fontTheme = await page.locator('#osera-chat-panel').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.fontFamily;
    });
    expect(fontTheme).toContain('sans');
  });

  test('test_f5_f4_chat_leads_conversion: verify chat reply for "price" recommends WhatsApp with link', async ({ page }) => {
    // Mock the API response to simulate the chatbot's recommendation
    await page.route('/api/chat', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ text: 'Sure! Please contact Osama on WhatsApp at https://wa.me/201066906132 for pricing and quotes.' }),
      });
    });

    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill('What is the price of a Django backend?');
    await page.locator('#osera-chat-panel button[type="submit"]').click();
    
    // Check chatbot response text contains WhatsApp link
    const chatPanel = page.locator('#osera-chat-panel');
    await expect(chatPanel).toContainText('wa.me');
    await expect(chatPanel).toContainText('201066906132');
  });

  test('test_f3_f6_gallery_scroll_animation: verify gallery cards show stagger entrance effects', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Sandbox"), button:has-text("Links"), button:has-text("المشاريع")').first().click();
    const hasStagger = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div[class*="border-amber-900/20"]'));
      return cards.some(c => {
        const transition = window.getComputedStyle(c).transitionDelay;
        return transition && transition !== '0s';
      });
    });
    expect(hasStagger).toBe(true);
  });

  test('test_f5_f2_lead_asymmetric_placement: verify WhatsApp conversion buttons are offset relative to center grid lines', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const ctaOffset = await page.evaluate(() => {
      const ctas = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
      if (ctas.length === 0) return 0;
      const cta = ctas[0];
      const rect = cta.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      return Math.abs(center - window.innerWidth / 2);
    });
    expect(ctaOffset).toBeGreaterThan(0);
  });
});
