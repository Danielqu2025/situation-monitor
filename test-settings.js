const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  
  // Click the X button to close welcome modal first
  const closeButton = await page.$('button[title="Close"]');
  if (closeButton) await closeButton.click();
  await page.waitForTimeout(500);
  
  // Click Settings button
  const settingsButton = await page.$('button:has-text("Settings")');
  if (settingsButton) await settingsButton.click();
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'E:/opencode/situation-monitor/settings-modal.png', fullPage: true });
  console.log('Settings modal screenshot saved');
  
  await browser.close();
})();
