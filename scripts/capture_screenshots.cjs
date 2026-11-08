const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\tttsp\\.gemini\\antigravity\\brain\\3880955c-6183-47e2-bfa8-5a6dc8387a84';
const publicDir = path.join(__dirname, '..', 'public', 'screenshots');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser with Edge at:', edgePath);
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const tasks = [
    { name: 'stage1-dark-1440.png', width: 1440, height: 900, theme: 'dark' },
    { name: 'stage1-light-1440.png', width: 1440, height: 900, theme: 'light' },
    { name: 'stage1-dark-375.png', width: 375, height: 812, theme: 'dark', isMobile: true },
    { name: 'stage1-light-375.png', width: 375, height: 812, theme: 'light', isMobile: true },
  ];

  for (const task of tasks) {
    const page = await browser.newPage();
    await page.setViewport({
      width: task.width,
      height: task.height,
      deviceScaleFactor: 2,
      isMobile: Boolean(task.isMobile),
      hasTouch: Boolean(task.isMobile),
    });

    const url = `http://localhost:3000/?theme=${task.theme}`;
    console.log(`Navigating to ${url} (${task.width}x${task.height})...`);
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200)); // wait for entrance animation to settle

    const artifactPath = path.join(artifactDir, task.name);
    const publicPath = path.join(publicDir, task.name);

    await page.screenshot({ path: artifactPath, fullPage: false });
    await page.screenshot({ path: publicPath, fullPage: false });
    console.log(`Saved screenshot to ${artifactPath}`);
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
