const puppeteer = require('puppeteer-core');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\tttsp\\.gemini\\antigravity\\brain\\3880955c-6183-47e2-bfa8-5a6dc8387a84';

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await page.click('button[aria-label="Open navigation menu"]');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artifactDir, 'stage1-mobile-menu-375.png') });
  console.log('Captured mobile menu!');
  await browser.close();
})();
