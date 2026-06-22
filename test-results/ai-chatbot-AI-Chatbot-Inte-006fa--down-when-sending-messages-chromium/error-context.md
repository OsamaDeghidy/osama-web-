# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ai-chatbot.spec.ts >> AI Chatbot Interface >> test_f4_t2_auto_scroll: verify chat auto-scrolls down when sending messages
- Location: tests\ai-chatbot.spec.ts:130:3

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Browser logs:

<launching> C:\Users\Osama\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=C:\Users\Osama\AppData\Local\Temp\playwright_chromiumdev_profile-La7xzY --remote-debugging-pipe --no-startup-window
<launched> pid=18440
[pid=18440][err] [0622/120105.282:INFO:CONSOLE:789] "[vite] connecting...", source: http://localhost:3000/@vite/client (789)
[pid=18440][err] [0622/120105.300:INFO:CONSOLE:912] "[vite] connected.", source: http://localhost:3000/@vite/client (912)
[pid=18440][err] [0622/120105.448:INFO:CONSOLE:20101] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:3000/node_modules/.vite/deps/react-dom_client.js?v=40b3c5f7 (20101)
[pid=18440][err] [0622/120128.190:INFO:CONSOLE:789] "[vite] connecting...", source: http://localhost:3000/@vite/client (789)
[pid=18440][err] [0622/120128.297:INFO:CONSOLE:912] "[vite] connected.", source: http://localhost:3000/@vite/client (912)
[pid=18440][err] [0622/120128.539:INFO:CONSOLE:20101] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:3000/node_modules/.vite/deps/react-dom_client.js?v=40b3c5f7 (20101)
Call log:
  - waiting for locator('#osera-chat-panel input[type="text"]')
    - locator resolved to <input value="" disabled type="text" placeholder="Ask about backend architectures, N+1..." class="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"/>
    - fill("This is message number 3 to force scroll bounds")
  - attempting fill action
    2 × waiting for element to be visible, enabled and editable
      - element is not enabled
    - retrying fill action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and editable
      - element is not enabled
    - retrying fill action
      - waiting 100ms
    3 × waiting for element to be visible, enabled and editable
      - element is not enabled
    - retrying fill action
      - waiting 500ms

```

# Test source

```ts
  39  |     await page.goto('/');
  40  |     await page.locator('#osera-chat-launcher').click();
  41  |     const text = await page.locator('#osera-chat-panel').innerText();
  42  |     expect(text).toMatch(/(Osama|OSERA)/i);
  43  |   });
  44  | 
  45  |   test('test_f4_t1_message_bubbles: verify rendering of user vs model message bubbles', async ({ page }) => {
  46  |     await page.goto('/');
  47  |     await page.locator('#osera-chat-launcher').click();
  48  |     
  49  |     // Check initial model message exists
  50  |     const initialMsg = page.locator('#osera-chat-panel div[class*="justify-start"]');
  51  |     await expect(initialMsg.first()).toBeVisible();
  52  | 
  53  |     // Type and send a user message
  54  |     const input = page.locator('#osera-chat-panel input[type="text"]');
  55  |     await input.fill('Hello OSERA');
  56  |     await page.locator('#osera-chat-panel button[type="submit"]').click();
  57  | 
  58  |     // Check user bubble is rendered (justify-end)
  59  |     const userMsg = page.locator('#osera-chat-panel div[class*="justify-end"]');
  60  |     await expect(userMsg.first()).toBeVisible();
  61  |   });
  62  | 
  63  |   test('test_f4_t2_empty_submit: verify empty input submissions do not post bubbles', async ({ page }) => {
  64  |     await page.goto('/');
  65  |     await page.locator('#osera-chat-launcher').click();
  66  |     const bubblesBefore = await page.locator('#osera-chat-panel div[class*="justify-"]').count();
  67  |     
  68  |     const input = page.locator('#osera-chat-panel input[type="text"]');
  69  |     await input.fill('   '); // spaces
  70  |     await page.locator('#osera-chat-panel button[type="submit"]').click({ force: true });
  71  |     
  72  |     const bubblesAfter = await page.locator('#osera-chat-panel div[class*="justify-"]').count();
  73  |     expect(bubblesAfter).toBe(bubblesBefore);
  74  |   });
  75  | 
  76  |   test('test_f4_t2_long_input: verify long prompt inputs do not distort wrapper', async ({ page }) => {
  77  |     await page.goto('/');
  78  |     await page.locator('#osera-chat-launcher').click();
  79  |     
  80  |     const longPrompt = 'A'.repeat(5000);
  81  |     const input = page.locator('#osera-chat-panel input[type="text"]');
  82  |     await input.fill(longPrompt);
  83  |     
  84  |     // Check panel height is still within normal bounds (590px max)
  85  |     const panelHeight = await page.locator('#osera-chat-panel').evaluate(el => el.getBoundingClientRect().height);
  86  |     expect(panelHeight).toBeLessThanOrEqual(600);
  87  |   });
  88  | 
  89  |   test('test_f4_t2_history_persistence: verify closing and reopening maintains chat bubbles', async ({ page }) => {
  90  |     await page.goto('/');
  91  |     await page.locator('#osera-chat-launcher').click();
  92  |     
  93  |     // Send a unique message
  94  |     const input = page.locator('#osera-chat-panel input[type="text"]');
  95  |     await input.fill('UniquePersistentMessage123');
  96  |     await page.locator('#osera-chat-panel button[type="submit"]').click();
  97  |     
  98  |     // Close panel
  99  |     await page.locator('#osera-chat-panel button:has(.lucide-x), #osera-chat-panel button:has-text("X")').first().click();
  100 |     await expect(page.locator('#osera-chat-panel')).toBeHidden();
  101 |     
  102 |     // Reopen panel
  103 |     await page.locator('#osera-chat-launcher').click();
  104 |     await expect(page.locator('#osera-chat-panel')).toBeVisible();
  105 |     await expect(page.locator('#osera-chat-panel')).toContainText('UniquePersistentMessage123');
  106 |   });
  107 | 
  108 |   test('test_f4_t2_error_handling: verify graceful error handling UI on API failure', async ({ page }) => {
  109 |     // Intercept API call and return 500
  110 |     await page.route('/api/chat', async route => {
  111 |       await route.fulfill({
  112 |         status: 500,
  113 |         contentType: 'application/json',
  114 |         body: JSON.stringify({ error: 'Mocked API failure' }),
  115 |       });
  116 |     });
  117 | 
  118 |     await page.goto('/');
  119 |     await page.locator('#osera-chat-launcher').click();
  120 |     
  121 |     const input = page.locator('#osera-chat-panel input[type="text"]');
  122 |     await input.fill('Trigger error');
  123 |     await page.locator('#osera-chat-panel button[type="submit"]').click();
  124 |     
  125 |     // Verify error notification panel/text
  126 |     const errorBox = page.locator('#osera-chat-panel div[class*="bg-red-"]');
  127 |     await expect(errorBox).toBeVisible();
  128 |   });
  129 | 
  130 |   test('test_f4_t2_auto_scroll: verify chat auto-scrolls down when sending messages', async ({ page }) => {
  131 |     await page.goto('/');
  132 |     await page.locator('#osera-chat-launcher').click();
  133 |     
  134 |     // Send multiple long messages to force scrollbar
  135 |     const chatPane = page.locator('#osera-chat-panel div[class*="overflow-y-auto"]');
  136 |     const input = page.locator('#osera-chat-panel input[type="text"]');
  137 |     
  138 |     for (let i = 0; i < 5; i++) {
> 139 |       await input.fill(`This is message number ${i} to force scroll bounds`);
      |                   ^ Error: locator.fill: Target page, context or browser has been closed
  140 |       await page.locator('#osera-chat-panel button[type="submit"]').click();
  141 |       await page.waitForTimeout(100);
  142 |     }
  143 |     
  144 |     const isScrolledToBottom = await chatPane.evaluate(el => {
  145 |       return Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 15;
  146 |     });
  147 |     expect(isScrolledToBottom).toBe(true);
  148 |   });
  149 | });
  150 | 
```