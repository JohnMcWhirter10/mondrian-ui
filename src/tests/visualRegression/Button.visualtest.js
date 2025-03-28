/**
 * Visual Regression Tests for Button Component
 *
 * This file tests that the Button component maintains its Mondrian styling
 * across different themes and states.
 */

const {
  testComponentForVisualRegressions,
} = require('./setupVisualRegressionTests');

describe('Button Visual Regression Tests', () => {
  // Need to start Storybook server before running tests
  // This can be done in a beforeAll or as part of your CI pipeline

  test('Default Button themes maintain Mondrian styling', async () => {
    await testComponentForVisualRegressions('button', [
      'primary',
      'light',
      'dark',
      'error',
      'success',
    ]);
  });

  test('Button sizes maintain Mondrian styling', async () => {
    await testComponentForVisualRegressions('button', [
      'small',
      'default',
      'large',
    ]);
  });

  test('Button maintains Mondrian styling in dark mode', async () => {
    await testComponentForVisualRegressions(
      'button',
      ['primary', 'light', 'dark'],
      { theme: 'dark' }
    );
  });

  // This test simulates interaction
  test('Button hover state maintains Mondrian styling', async () => {
    const {
      captureComponentScreenshot,
    } = require('./setupVisualRegressionTests');
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the button story
    await page.goto('http://localhost:6006/iframe.html?id=button--primary', {
      waitUntil: 'networkidle0',
    });

    // Hover the button
    await page.hover('.mondrian-button');

    // Wait for hover animations to complete
    await page.waitForTimeout(500);

    // Take screenshot
    const screenshot = await page.screenshot();

    // Close browser
    await browser.close();

    // Compare to baseline
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: 'button-primary-hover',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});
