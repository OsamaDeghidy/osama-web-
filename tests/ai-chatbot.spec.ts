import { test, expect } from '@playwright/test';

test.describe('AI Chatbot Interface', () => {
  test('test_f4_t1_chat_visibility: verify chatbot launcher opens history panel', async ({ page }) => {
    await page.goto('/');
    const launcher = page.locator('#osera-chat-launcher');
    await expect(launcher).toBeVisible();
    await launcher.click();
    const panel = page.locator('#osera-chat-panel');
    await expect(panel).toBeVisible();
  });

  test('test_f4_t1_luxury_chat_colors: verify chatbot colors are black/gold/platinum with no purple', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const panel = page.locator('#osera-chat-panel');
    const classes = await panel.evaluate(el => el.className);
    expect(classes).not.toMatch(/(purple|violet|indigo)/i);
    // Check computed dark bg
    const bg = await panel.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const rgb = bg.match(/\d+/g);
    if (rgb) {
      expect(parseInt(rgb[0])).toBeLessThan(20);
      expect(parseInt(rgb[1])).toBeLessThan(20);
      expect(parseInt(rgb[2])).toBeLessThan(20);
    }
  });

  test('test_f4_t1_chat_inputs: verify text input and submit button are active', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await expect(input).toBeVisible();
    const submit = page.locator('#osera-chat-panel button[type="submit"]');
    await expect(submit).toBeVisible();
  });

  test('test_f4_t1_founder_mention: verify prompt hints and welcome text reference Osama/OSERA', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const text = await page.locator('#osera-chat-panel').innerText();
    expect(text).toMatch(/(Osama|OSERA)/i);
  });

  test('test_f4_t1_message_bubbles: verify rendering of user vs model message bubbles', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    
    // Check initial model message exists
    const initialMsg = page.locator('#osera-chat-panel div[class*="justify-start"]');
    await expect(initialMsg.first()).toBeVisible();

    // Type and send a user message
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill('Hello OSERA');
    await page.locator('#osera-chat-panel button[type="submit"]').click();

    // Check user bubble is rendered (justify-end)
    const userMsg = page.locator('#osera-chat-panel div[class*="justify-end"]');
    await expect(userMsg.first()).toBeVisible();
  });

  test('test_f4_t2_empty_submit: verify empty input submissions do not post bubbles', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    const bubblesBefore = await page.locator('#osera-chat-panel div[class*="justify-"]').count();
    
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill('   '); // spaces
    await page.locator('#osera-chat-panel button[type="submit"]').click({ force: true });
    
    const bubblesAfter = await page.locator('#osera-chat-panel div[class*="justify-"]').count();
    expect(bubblesAfter).toBe(bubblesBefore);
  });

  test('test_f4_t2_long_input: verify long prompt inputs do not distort wrapper', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    
    const longPrompt = 'A'.repeat(5000);
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill(longPrompt);
    
    // Check panel height is still within normal bounds (590px max)
    const panelHeight = await page.locator('#osera-chat-panel').evaluate(el => el.getBoundingClientRect().height);
    expect(panelHeight).toBeLessThanOrEqual(600);
  });

  test('test_f4_t2_history_persistence: verify closing and reopening maintains chat bubbles', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    
    // Send a unique message
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill('UniquePersistentMessage123');
    await page.locator('#osera-chat-panel button[type="submit"]').click();
    
    // Close panel
    await page.locator('#osera-chat-panel button:has(.lucide-x), #osera-chat-panel button:has-text("X")').first().click();
    await expect(page.locator('#osera-chat-panel')).toBeHidden();
    
    // Reopen panel
    await page.locator('#osera-chat-launcher').click();
    await expect(page.locator('#osera-chat-panel')).toBeVisible();
    await expect(page.locator('#osera-chat-panel')).toContainText('UniquePersistentMessage123');
  });

  test('test_f4_t2_error_handling: verify graceful error handling UI on API failure', async ({ page }) => {
    // Intercept API call and return 500
    await page.route('/api/chat', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Mocked API failure' }),
      });
    });

    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    
    const input = page.locator('#osera-chat-panel input[type="text"]');
    await input.fill('Trigger error');
    await page.locator('#osera-chat-panel button[type="submit"]').click();
    
    // Verify error notification panel/text
    const errorBox = page.locator('#osera-chat-panel div[class*="bg-red-"]');
    await expect(errorBox).toBeVisible();
  });

  test('test_f4_t2_auto_scroll: verify chat auto-scrolls down when sending messages', async ({ page }) => {
    await page.goto('/');
    await page.locator('#osera-chat-launcher').click();
    
    // Send multiple long messages to force scrollbar
    const chatPane = page.locator('#osera-chat-panel div[class*="overflow-y-auto"]');
    const input = page.locator('#osera-chat-panel input[type="text"]');
    
    for (let i = 0; i < 5; i++) {
      await input.fill(`This is message number ${i} to force scroll bounds`);
      await page.locator('#osera-chat-panel button[type="submit"]').click();
      await page.waitForTimeout(100);
    }
    
    const isScrolledToBottom = await chatPane.evaluate(el => {
      return Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 15;
    });
    expect(isScrolledToBottom).toBe(true);
  });
});
