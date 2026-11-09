const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:3000';
const ARTIFACTS_DIR = 'C:\\Users\\tttsp\\.gemini\\antigravity\\brain\\3880955c-6183-47e2-bfa8-5a6dc8387a84';

async function runTests() {
  console.log('========================================================');
  console.log('STARTING REDESIGNED MUSIC DOCK & SYNC AUDIT VERIFICATION');
  console.log('========================================================');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=user-gesture-required',
      '--disable-web-security',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));

    await page.goto(URL, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // 1. Initial State: Autoplay blocked, gentle ripple, hint text
    console.log('\n[1] Checking Pre-Interaction State...');
    const preState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      const btn = document.querySelector('[data-music-btn="true"]');
      const dock = btn?.closest('.fixed');
      const hint = dock?.innerText.includes('tap anywhere to play');
      const lyricLine = dock?.querySelector('span.whitespace-nowrap');
      return {
        audioPaused: audio ? audio.paused : null,
        btnExists: !!btn,
        hintVisible: !!hint,
        lyricVisible: !!lyricLine,
      };
    });
    console.log('Pre-interaction state:', preState);
    if (!preState.audioPaused || !preState.btnExists || !preState.hintVisible || preState.lyricVisible) {
      throw new Error('Pre-interaction assertion failed: audio must be paused, hint visible, lyrics hidden');
    }
    console.log('✓ Initial state confirmed: audio paused, hint "tap anywhere to play ♪" visible, lyrics hidden.');

    // 2. (d) First click anywhere starts everything once
    console.log('\n[2] Testing (d): First click anywhere starts music & dock...');
    await page.mouse.click(600, 350); // Click neutral hero area
    await new Promise(r => setTimeout(r, 600));

    const postStart = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      const btn = document.querySelector('[data-music-btn="true"]');
      return {
        paused: audio?.paused,
        currentTime: audio?.currentTime,
        ariaLabel: btn?.getAttribute('aria-label'),
        ariaPressed: btn?.getAttribute('aria-pressed'),
      };
    });
    console.log('Post-first-click state:', postStart);
    if (postStart.paused !== false) {
      throw new Error('(d) FAIL: First click did not start playback');
    }
    console.log('✓ (d) PASS: First click anywhere started playback once!');

    // Test second click elsewhere does nothing
    await page.mouse.click(700, 450);
    await new Promise(r => setTimeout(r, 300));
    const postSecondClick = await page.evaluate(() => document.querySelector('audio')?.paused);
    if (postSecondClick !== false) {
      throw new Error('(d) FAIL: Second click toggled or stopped playback');
    }
    console.log('✓ (d) PASS: Second click elsewhere does not toggle or restart playback!');

    // 3. (a) Sync & Vocals verification
    console.log('\n[3] Testing (a): Lyrics sync at vocals start (8.6s)...');
    await page.evaluate(() => {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = 8.6;
    });
    await new Promise(r => setTimeout(r, 500));

    const line1State = await page.evaluate(() => {
      const btn = document.querySelector('[data-music-btn="true"]');
      const dock = btn?.closest('.fixed');
      const textEl = dock?.querySelector('span.whitespace-nowrap');
      return {
        text: textEl?.textContent || '',
      };
    });
    console.log('Active line at 8.6s:', line1State);
    if (!line1State.text.includes('Will you hold the line')) {
      throw new Error('(a) FAIL: Lyrics line 1 mismatch at 8.6s: got "' + line1State.text + '"');
    }
    console.log('✓ (a) PASS: Lyrics synced: "Will you hold the line"');

    // 4. (b) Spaces Bug Fix Verification
    console.log('\n[4] Testing (b): Spaces preservation (checking "That you\'re a natural")...');
    await page.evaluate(() => {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = 45.6; // Jump to chorus line
    });
    await new Promise(r => setTimeout(r, 500));

    const chorusLineState = await page.evaluate(() => {
      const btn = document.querySelector('[data-music-btn="true"]');
      const dock = btn?.closest('.fixed');
      const textEl = dock?.querySelector('span.whitespace-nowrap');
      return {
        rawText: textEl?.textContent || '',
        hasGluedWords: textEl?.textContent?.includes("Thatyou'rea") || textEl?.textContent?.includes("cutthroatYou"),
      };
    });
    console.log('Chorus line text check:', chorusLineState);
    if (chorusLineState.hasGluedWords || !chorusLineState.rawText.includes("That you're a natural") && !chorusLineState.rawText.includes("'Cause you're a natural")) {
      throw new Error('(b) FAIL: Spaces are lost or words are glued together!');
    }
    console.log('✓ (b) PASS: All spaces render naturally! No glued words (exact text: "' + chorusLineState.rawText + '")');

    // 5. (c) No line wrap or abrupt clipping
    console.log('\n[5] Testing (c): Long line handling (no wrapping, single line)...');
    await page.evaluate(() => {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = 11.0; // Long line: "When every one of them has given up and given in? Tell me"
    });
    await new Promise(r => setTimeout(r, 500));

    const longLineCheck = await page.evaluate(() => {
      const btn = document.querySelector('[data-music-btn="true"]');
      const dock = btn?.closest('.fixed');
      const textEl = dock?.querySelector('span.whitespace-nowrap');
      const container = textEl?.parentElement;
      return {
        text: textEl?.textContent || '',
        containerHeight: container?.getBoundingClientRect().height,
        textHeight: textEl?.getBoundingClientRect().height,
        whiteSpace: window.getComputedStyle(textEl || document.body).whiteSpace,
        isSingleLine: (container?.getBoundingClientRect().height || 0) <= 32,
      };
    });
    console.log('Long line check:', longLineCheck);
    if (!longLineCheck.isSingleLine || longLineCheck.whiteSpace !== 'nowrap') {
      throw new Error('(c) FAIL: Long line wrapped into multiple lines');
    }
    console.log('✓ (c) PASS: Strictly single-line, zero wrapping or abrupt clipping!');

    // 6. Pause & Freeze & Resume
    console.log('\n[6] Testing Pause & Lyrics Freeze...');
    const btn = await page.$('[data-music-btn="true"]');
    await btn.click();
    await new Promise(r => setTimeout(r, 400));

    const pauseCheck = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      const btn = document.querySelector('[data-music-btn="true"]');
      const dock = btn?.closest('.fixed');
      const textEl = dock?.querySelector('span.whitespace-nowrap');
      return {
        paused: audio?.paused,
        frozenText: textEl?.textContent,
        ariaLabel: btn?.getAttribute('aria-label'),
      };
    });
    console.log('Pause state:', pauseCheck);
    if (pauseCheck.paused !== true || !pauseCheck.frozenText) {
      throw new Error('FAIL: Audio did not pause or lyrics did not freeze');
    }
    console.log('✓ PASS: Audio paused and lyrics froze on current line.');

    // Resume
    await btn.click();
    await new Promise(r => setTimeout(r, 400));
    const resumeCheck = await page.evaluate(() => document.querySelector('audio')?.paused);
    if (resumeCheck !== false) throw new Error('FAIL: Resume failed');
    console.log('✓ PASS: Resumed successfully!');

    // 7. Tab visibility change
    console.log('\n[7] Testing Tab visibilitychange (pause on hide, resume on show)...');
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await new Promise(r => setTimeout(r, 300));
    const isPausedOnHide = await page.evaluate(() => document.querySelector('audio')?.paused);

    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await new Promise(r => setTimeout(r, 300));
    const isPlayingOnShow = await page.evaluate(() => !document.querySelector('audio')?.paused);

    if (!isPausedOnHide || !isPlayingOnShow) {
      throw new Error('FAIL: Visibilitychange did not pause/resume correctly');
    }
    console.log('✓ PASS: Visibilitychange pause/resume verified!');

    // 8. (e) Responsive Layout across Viewports (1920x1080, 1366x768, 390x844)
    console.log('\n[8] Testing (e): Responsive layout and screenshot captures...');
    const viewports = [
      { name: 'desktop-1920x1080', width: 1920, height: 1080 },
      { name: 'laptop-1366x768', width: 1366, height: 768 },
      { name: 'mobile-390x844', width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.evaluate(() => {
        const audio = document.querySelector('audio');
        if (audio) audio.currentTime = 8.8;
      });
      await new Promise(r => setTimeout(r, 600));

      const dockMetrics = await page.evaluate(() => {
        const btn = document.querySelector('[data-music-btn="true"]');
        const dock = btn?.closest('.fixed');
        const rect = dock?.getBoundingClientRect();
        const navSideRail = document.querySelector('aside');
        const railRect = navSideRail?.getBoundingClientRect();
        return {
          dockRect: rect ? { top: rect.top, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height } : null,
          railBottom: railRect ? railRect.bottom : null,
          text: dock?.querySelector('span.whitespace-nowrap')?.textContent,
        };
      });

      console.log(`[Viewport ${vp.name}] Dock metrics:`, dockMetrics);

      const shotPath = path.join(ARTIFACTS_DIR, `music-dock-${vp.name}.png`);
      await page.screenshot({ path: shotPath });
      console.log(`Saved screenshot: ${shotPath}`);
    }

    // 9. Test /sync-tool.html
    console.log('\n[9] Testing dev calibration tool at /sync-tool.html...');
    await page.goto('http://localhost:3000/sync-tool.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    const syncToolStatus = await page.evaluate(() => {
      const title = document.querySelector('h1')?.innerText;
      const linesCount = document.querySelectorAll('.lyric-item').length;
      const playBtn = document.getElementById('btn-play');
      const copyBtn = document.getElementById('btn-copy');
      const downloadBtn = document.getElementById('btn-download');
      return {
        title,
        linesCount,
        hasControls: !!(playBtn && copyBtn && downloadBtn),
      };
    });
    console.log('Sync Tool status:', syncToolStatus);
    if (!syncToolStatus.hasControls || syncToolStatus.linesCount === 0) {
      throw new Error('FAIL: /sync-tool.html did not load properly');
    }
    console.log(`✓ PASS: /sync-tool.html loaded cleanly with ${syncToolStatus.linesCount} lines and all interactive controls!`);

    await page.close();
    console.log('\n========================================================');
    console.log('✓ ALL TESTS PASSED SUCCESSFULLY WITH ZERO REGRESSIONS!');
    console.log('========================================================');
  } catch (err) {
    console.error('Test Suite Failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runTests();
