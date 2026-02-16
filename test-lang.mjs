import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  // Load page
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(3000);
  
  // Select "Everything" preset to get to main dashboard
  const allButtons = await page.$$('button');
  for (const btn of allButtons) {
    const text = await btn.textContent();
    if (text && text.includes('Everything')) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(2000);
  
  // Click language toggle to switch to Chinese
  const langButtons = await page.$$('button');
  for (const btn of langButtons) {
    const text = await btn.textContent();
    if (text && (text.includes('中文') || text.includes('English'))) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(1000);
  
  // Open Settings
  const settingsButtons = await page.$$('button');
  for (const btn of settingsButtons) {
    const text = await btn.textContent();
    if (text && text.includes('设置')) {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'E:/opencode/situation-monitor/settings-chinese.png', fullPage: true });
  console.log('Chinese settings screenshot saved');
  
  await browser.close();
})();
