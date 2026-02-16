import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(3000);
  
  // Take screenshot first to see current state
  await page.screenshot({ path: 'E:/opencode/situation-monitor/step1-initial.png' });
  
  // Try to close the welcome modal by clicking the X button
  const closeButtons = await page.$$('button');
  for (const btn of closeButtons) {
    const text = await btn.textContent();
    if (text && text.includes('×')) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(500);
  
  await page.screenshot({ path: 'E:/opencode/situation-monitor/step2-after-close.png' });
  
  // Find and click Settings button
  const allButtons = await page.$$('button');
  for (const btn of allButtons) {
    const text = await btn.textContent();
    if (text && text.includes('Settings')) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'E:/opencode/situation-monitor/settings-modal.png', fullPage: true });
  console.log('Settings modal screenshot saved');
  
  await browser.close();
})();
