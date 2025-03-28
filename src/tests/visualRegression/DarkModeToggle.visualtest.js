/**
 * Visual Regression Tests for DarkModeToggle Component
 *
 * This file tests that the DarkModeToggle component maintains its Mondrian styling
 * across different states.
 */

const {
  testComponentForVisualRegressions,
} = require('./setupVisualRegressionTests');

describe('DarkModeToggle Visual Regression Tests', () => {
  // Need to start Storybook server before running tests
  // This can be done in a beforeAll or as part of your CI pipeline

  test('DarkModeToggle maintains Mondrian styling', async () => {
    await testComponentForVisualRegressions('dark-mode-toggle', [
      'default',
      'no-label',
      'custom-label',
    ]);
  });

  test('DarkModeToggle maintains Mondrian styling in dark mode', async () => {
    await testComponentForVisualRegressions(
      'dark-mode-toggle',
      ['default', 'no-label'],
      { theme: 'dark' }
    );
  });

  // This test simulates interaction
  test('DarkModeToggle hover state maintains Mondrian styling', async () => {
    const {
      captureComponentScreenshot,
    } = require('./setupVisualRegressionTests');
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the DarkModeToggle story
    await page.goto(
      'http://localhost:6006/iframe.html?id=dark-mode-toggle--default',
      {
        waitUntil: 'networkidle0',
      }
    );

    // Hover the toggle button
    await page.hover('.mondrian-dark-mode-button');

    // Wait for hover animations to complete
    await page.waitForTimeout(500);

    // Take screenshot
    const screenshot = await page.screenshot();

    // Close browser
    await browser.close();

    // Compare to baseline
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: 'dark-mode-toggle-hover',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});
