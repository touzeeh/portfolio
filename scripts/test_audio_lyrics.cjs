const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:3000';

async function run() {
  console.log('--- STARTING BACKGROUND MUSIC & SYNCED LYRICS VERIFICATION ---');

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
    // ---------------------------------------------------------
    // TEST SUITE 1: Autoplay Block, Gesture Unlock, Second Click, Pause & Freeze, Visibility
    // ---------------------------------------------------------
    console.log('\n[Suite 1] Testing standard gesture unlock, single-trigger, freeze on pause, and visibility...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));

    // Verify initial blocked state
    const initialState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      const tooltip = document.querySelector('[data-music-btn="true"]')?.parentElement?.innerText;
      const lyricsPill = document.querySelector('[aria-live="off"] > div');
      return {
        audioExists: !!audio,
        audioPaused: audio ? audio.paused : null,
        audioVolume: audio ? audio.volume : null,
        tooltipText: tooltip || '',
        lyricsPillVisible: !!lyricsPill,
      };
    });

    console.log('1. Initial state before interaction:', initialState);
    if (initialState.audioPaused) {
      console.log('✓ Initial state confirmed: audio paused, waiting silently for interaction.');
    }
    if (initialState.tooltipText.includes('tap anywhere to play')) {
      console.log('✓ Pre-start tooltip "tap anywhere to play ♪" is visible.');
    }
    if (!initialState.lyricsPillVisible) {
      console.log('✓ Lyrics pill is hidden prior to playback.');
    }

    // (a) First click anywhere starts playback and lyrics
    console.log('\n2. Testing (a): First click anywhere on the page...');
    await page.mouse.click(500, 300);
    await new Promise((r) => setTimeout(r, 600));

    const postClickState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      const btn = document.querySelector('[data-music-btn="true"]');
      return {
        audioPaused: audio ? audio.paused : null,
        audioCurrentTime: audio ? audio.currentTime : 0,
        ariaLabel: btn?.getAttribute('aria-label'),
        ariaPressed: btn?.getAttribute('aria-pressed'),
      };
    });
    console.log('Post-first-click audio state:', postClickState);
    if (postClickState.audioPaused === false) {
      console.log('✓ (a) PASS: First click anywhere started audio playback immediately!');
    } else {
      throw new Error('(a) FAIL: Audio failed to start on first interaction');
    }

    // Check volume fade in progress
    await new Promise((r) => setTimeout(r, 1600));
    const volumeState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return audio ? audio.volume : 0;
    });
    console.log(`Volume after 1.6s fade: ${volumeState.toFixed(2)} (target ~0.60)`);
    if (volumeState >= 0.55 && volumeState <= 0.65) {
      console.log('✓ Volume smoothly faded in to ~0.60!');
    }

    // (b) Second click anywhere does NOT pause or restart
    console.log('\n3. Testing (b): Second click elsewhere on the page...');
    await page.evaluate(() => {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = 5.0;
    });
    const timeBeforeSecondClick = await page.evaluate(() => document.querySelector('audio')?.currentTime || 0);
    await page.mouse.click(600, 400);
    await new Promise((r) => setTimeout(r, 300));
    const timeAfterSecondClick = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return {
        paused: audio ? audio.paused : null,
        time: audio ? audio.currentTime : 0,
      };
    });
    console.log('State after second click:', timeAfterSecondClick);
    if (!timeAfterSecondClick.paused && timeAfterSecondClick.time >= timeBeforeSecondClick) {
      console.log('✓ (b) PASS: Second click did NOT pause, toggle, or restart music.');
    } else {
      throw new Error('(b) FAIL: Second click affected audio playback');
    }

    // Test lyrics synchronization at vocals timestamp (8.5s)
    console.log('\n4. Testing lyrics synchronization at vocals timestamp (8.5s)...');
    await page.evaluate(() => {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = 8.6;
    });
    await new Promise((r) => setTimeout(r, 500));
    const lyricsState = await page.evaluate(() => {
      const pill = document.querySelector('[aria-live="off"]');
      const text = pill?.textContent || '';
      return {
        pillVisible: !!pill && text.trim().length > 0,
        text: text.trim(),
      };
    });
    console.log('Active lyrics at 8.6s:', lyricsState);
    if (lyricsState.pillVisible && lyricsState.text.toLowerCase().includes('hold')) {
      console.log('✓ PASS: Synced lyrics displayed correct line: "Will you hold the line?"');
    }

    // (d) Manual pause works and freezes lyrics
    console.log('\n5. Testing (d): Manual pause button...');
    const btnHandle = await page.$('[data-music-btn="true"]');
    await btnHandle.click();
    await new Promise((r) => setTimeout(r, 400));

    const pauseState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      const pill = document.querySelector('[aria-live="off"]');
      const btn = document.querySelector('[data-music-btn="true"]');
      return {
        paused: audio ? audio.paused : null,
        currentTime: audio ? audio.currentTime : null,
        pillText: pill?.textContent || '',
        ariaLabel: btn?.getAttribute('aria-label'),
      };
    });
    console.log('State after clicking pause button:', pauseState);
    if (pauseState.paused === true && pauseState.pillText.toLowerCase().includes('hold')) {
      console.log('✓ (d) PASS: Manual pause stopped audio and froze lyrics on current line!');
    } else {
      throw new Error('(d) FAIL: Manual pause did not pause audio or freeze lyrics');
    }

    // Resume from pause
    await btnHandle.click();
    await new Promise((r) => setTimeout(r, 400));
    const resumeState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return { paused: audio ? audio.paused : null };
    });
    console.log('State after resume click:', resumeState);
    if (resumeState.paused === false) {
      console.log('✓ Resume playback confirmed!');
    }

    // (e) Tab hidden pauses and visible resumes
    console.log('\n6. Testing (e): Tab visibility change (hidden / visible)...');
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await new Promise((r) => setTimeout(r, 300));
    const hiddenState = await page.evaluate(() => document.querySelector('audio')?.paused);
    console.log('Audio paused on tab hidden:', hiddenState);

    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await new Promise((r) => setTimeout(r, 300));
    const visibleState = await page.evaluate(() => document.querySelector('audio')?.paused);
    console.log('Audio paused on tab visible:', visibleState);

    if (hiddenState === true && visibleState === false) {
      console.log('✓ (e) PASS: Visibilitychange correctly pauses on hide and resumes on show!');
    } else {
      throw new Error('(e) FAIL: Visibility change handling failed');
    }

    await page.close();

    // ---------------------------------------------------------
    // TEST SUITE 2: First Click Directly on the Button (Double-Handling Bug Prevention)
    // ---------------------------------------------------------
    console.log('\n[Suite 2] Testing (c): First click directly on the button...');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1920, height: 1080 });
    await page2.goto(URL, { waitUntil: 'networkidle2' });
    await page2.evaluate(() => localStorage.clear());
    await page2.reload({ waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 800));

    const btnDirect = await page2.$('[data-music-btn="true"]');
    console.log('Clicking directly on the music button as the very first user interaction...');
    await btnDirect.click();
    await new Promise((r) => setTimeout(r, 600));

    const directClickAudioState = await page2.evaluate(() => {
      const audio = document.querySelector('audio');
      const btn = document.querySelector('[data-music-btn="true"]');
      return {
        paused: audio ? audio.paused : null,
        ariaLabel: btn?.getAttribute('aria-label'),
        ariaPressed: btn?.getAttribute('aria-pressed'),
      };
    });
    console.log('State after first click directly on button:', directClickAudioState);
    if (directClickAudioState.paused === false) {
      console.log('✓ (c) PASS: First click directly on button started playback without immediate pause!');
    } else {
      throw new Error('(c) FAIL: Button click double-handled or failed to start');
    }
    await page2.close();

    // ---------------------------------------------------------
    // TEST SUITE 3: Layout & Screenshots across 1920x1080, 1366x768, and 390x844
    // ---------------------------------------------------------
    console.log('\n[Suite 3] Testing (f): Responsive layout across viewports...');
    const viewports = [
      { name: '1920x1080', width: 1920, height: 1080 },
      { name: '1366x768', width: 1366, height: 768 },
      { name: '390x844', width: 390, height: 844 },
    ];

    const artifactsDir = 'C:\\Users\\tttsp\\.gemini\\antigravity\\brain\\3880955c-6183-47e2-bfa8-5a6dc8387a84';

    for (const vp of viewports) {
      const p = await browser.newPage();
      await p.setViewport({ width: vp.width, height: vp.height });
      await p.goto(URL, { waitUntil: 'networkidle2' });

      // Start music and jump to line 1
      await p.mouse.click(vp.width / 2, vp.height / 2);
      await new Promise((r) => setTimeout(r, 400));
      await p.evaluate(() => {
        const audio = document.querySelector('audio');
        if (audio) audio.currentTime = 9.2;
      });
      await new Promise((r) => setTimeout(r, 600));

      const layoutCheck = await p.evaluate(() => {
        const nav = document.querySelector('header');
        const pill = document.querySelector('[aria-live="off"] > div');
        const btn = document.querySelector('[data-music-btn="true"]');

        const nr = nav ? nav.getBoundingClientRect() : null;
        const pr = pill ? pill.getBoundingClientRect() : null;
        const br = btn ? btn.getBoundingClientRect() : null;

        const pillTop = pr ? pr.top : 0;
        const navBottom = nr ? nr.bottom : 0;
        const isBelowNav = pillTop >= navBottom;
        const gap = pillTop - navBottom;

        return {
          pillLeft: pr ? pr.left : null,
          pillTop: pr ? pr.top : null,
          navBottom: nr ? nr.bottom : null,
          isBelowNav,
          gap,
          btnBottom: br ? br.bottom : null,
          btnLeft: br ? br.left : null,
          pillText: pill?.textContent || '',
        };
      });

      console.log(`\nViewport [${vp.name}]:`, {
        pillTop: layoutCheck.pillTop,
        navBottom: layoutCheck.navBottom,
        gapBelowNav: layoutCheck.gap,
        isBelowNav: layoutCheck.isBelowNav,
        btnBottom: layoutCheck.btnBottom,
        btnLeft: layoutCheck.btnLeft,
        text: layoutCheck.pillText,
      });

      if (layoutCheck.isBelowNav) {
        console.log(`✓ [${vp.name}] PASS: Lyric pill sits cleanly below header with ${layoutCheck.gap}px gap!`);
      } else {
        throw new Error(`[${vp.name}] FAIL: Lyric pill overlaps header`);
      }

      const screenshotPath = path.join(artifactsDir, `music-synced-${vp.name}.png`);
      await p.screenshot({ path: screenshotPath });
      console.log(`Saved screenshot to: ${screenshotPath}`);

      await p.close();
    }

    console.log('\n========================================================');
    console.log('✓ ALL CRITERIA (a) THROUGH (f) VERIFIED AND CONFIRMED!');
    console.log('========================================================');
  } catch (err) {
    console.error('Test Suite encountered error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();
