# plan: E2E Test Suite Development Plan

## Phase 1: Exploration and Preparation
1. **Analyze target package.json & environment**: Determine if any test runner or testing dependencies are already installed. Check existing package configuration.
2. **Determine installation method**: Decide how to install Playwright or Puppeteer. Ensure no global pip installs are used, and follow `managing-python-dependencies` or node best practices as needed.
3. **Verify current port configuration**: Read `server.ts` or `vite.config.ts` to identify default ports.

## Phase 2: Testing Infrastructure Setup
1. **Spawn worker to install Playwright**:
   - Install `@playwright/test` as devDependency.
   - Install required Playwright browser engines.
   - Verify setup by creating a skeleton configuration file and a simple test that opens a page.
2. **Add npm scripts**:
   - Add `"test:e2e": "playwright test"` to `package.json`.
3. **Draft initial test runner check**:
   - Verify that running `npm run test:e2e` completes and runs the skeleton test.

## Phase 3: Test Case Design & Implementation
1. **Design 71 test cases**:
   - **Tier 1 (Feature Coverage)**: 5 tests per feature * 6 features = 30 tests.
     - F1: Visual Style (bg colors, luxury tones, serif/sans fonts).
     - F2: Asymmetry (hero split, layout offsets, empty columns).
     - F3: Animations (framer motion tags, state checks, hover classes).
     - F4: AI Chat (chat panel visibility, prompt input, send button, message bubble styling).
     - F5: WhatsApp (link pattern, button attributes, luxury visual accent, accessibility).
     - F6: Projects Gallery (asymmetric display, project card content, layout classes).
   - **Tier 2 (Boundary & Edge Cases)**: 5 tests per feature * 6 features = 30 tests.
     - F1: Missing style declarations, screen resize style adaptation, theme transitions, contrast ratios.
     - F2: Mobile responsive layouts, ultra-wide desktop layouts, content overflow, padding alignments.
     - F3: Hover states, animations disabled user preference, fast scrolling triggers, dynamic content insertions.
     - F4: Empty chat submissions, extremely long prompt entries, chat closure/re-open preservation, network disconnect simulations.
     - F5: Multiple WhatsApp button locations, phone number format verification, click actions.
     - F6: Variable project card numbers (0, 1, many), empty images fallback, layout consistency.
   - **Tier 3 (Cross-feature Combinations)**: 6 pairwise tests.
     - Pairwise combinations of features (e.g. F1 and F3; F2 and F6; F4 and F5).
   - **Tier 4 (Real-World Scenarios)**: 5 scenario tests.
     - Detailed user journeys (e.g., enterprise user landing on page, admiring gallery, testing animation, interacting with AI assistant, and converting via WhatsApp).
2. **Spawn worker to implement test cases**:
   - Write test files in `tests/` directory.
   - Ensure clear selectors, proper wait-for selectors, clean checks of computed styles, no hardcoded internal module mocks.

## Phase 4: Verification and Documentation
1. **Execute E2E test suite**:
   - Run tests against baseline application. Since the baseline may not have implemented all features, the tests are expected to report some failures, but the test runner itself must run successfully.
2. **Write TEST_INFRA.md**:
   - Describe test runner, feature inventory, tier structure.
3. **Publish TEST_READY.md**:
   - Place `TEST_READY.md` at root.
4. **Final audit and verification**:
   - Run a clean check and prepare the report for the parent Sentinel.
