import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(3000);
  
  // Close welcome modal
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.textContent();
    if (text && text.includes('×')) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(500);
  
  // Open Settings
  const allButtons = await page.$$('button');
  for (const btn of allButtons) {
    const text = await btn.textContent();
    if (text && text.includes('Settings')) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(1000);
  
  // Click on Technology tab
  const techTab = await page.$('button:has-text("Technology")');
  if (techTab) await techTab.click();
  await page.waitForTimeout(500);
  
  // Click on Recommended button
  const recButton = await page.$('button:has-text("Recommended")');
  if (recButton) await recButton.click();
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'E:/opencode/situation-monitor/recommended-sources.png', fullPage: true });
  console.log('Recommended sources screenshot saved');
  
  await browser.close();
})();
