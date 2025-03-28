/**
 * Visual Regression Test Setup for Mondrian UI Components
 *
 * This file sets up visual regression testing to ensure that components
 * maintain their Mondrian styling over time. It captures screenshots
 * of components and compares them to baseline images.
 *
 * To use this with Jest and Puppeteer, you'll need to install:
 * npm install --save-dev jest-image-snapshot puppeteer
 */

const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

// Add the custom matcher to Jest
expect.extend({ toMatchImageSnapshot });

/**
 * Captures a screenshot of a Storybook story for visual regression testing
 *
 * @param {string} componentName - Name of the component
 * @param {string} storyName - Name of the story
 * @param {object} options - Additional options like viewport size, theme, etc.
 * @returns {Promise<Buffer>} - Screenshot as a Buffer
 */
async function captureComponentScreenshot(
  componentName,
  storyName,
  options = {}
) {
  const {
    viewport = { width: 800, height: 600 },
    theme = 'light',
    wait = 1000, // wait time for animations to complete
  } = options;

  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport
  await page.setViewport(viewport);

  // Navigate to the component story in Storybook
  // Assuming Storybook is running on localhost:6006
  const url = `http://localhost:6006/iframe.html?id=${componentName}--${storyName}&theme=${theme}`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Wait for any animations to complete
  await page.waitForTimeout(wait);

  // Take a screenshot
  const screenshot = await page.screenshot();

  // Close browser
  await browser.close();

  return screenshot;
}

/**
 * Tests a component for visual regressions
 *
 * @param {string} componentName - Name of the component
 * @param {string[]} storyNames - Names of the stories to test
 * @param {object} options - Additional options like viewport size, theme, etc.
 */
async function testComponentForVisualRegressions(
  componentName,
  storyNames,
  options = {}
) {
  for (const storyName of storyNames) {
    const screenshot = await captureComponentScreenshot(
      componentName,
      storyName,
      options
    );

    // Use jest-image-snapshot to compare to baseline
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: `${componentName}-${storyName}-${options.theme || 'light'}`,
      failureThreshold: 0.01, // 1% threshold for differences
      failureThresholdType: 'percent',
    });
  }
}

module.exports = {
  captureComponentScreenshot,
  testComponentForVisualRegressions,
};
