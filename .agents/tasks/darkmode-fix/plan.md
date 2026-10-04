# Implementation Plan: dark-mode fix + visual audit (SahabatGinjal)

Context
- Work happens directly in the main branch working tree at `c:\Users\babaj\OneDrive\Documents\SahabatGinjal` (no worktree). Do NOT commit or push.
- Stack: Vite 8.3.1, React 19.3.0, Tailwind 4.3.3 (`@tailwindcss/vite`), motion 13.4.6, lucide-react, oxlint. Commands: `npm run build`, `npm run lint`, `npm run preview`.
- Dark mode: `.dark` class on `<html>` (inline script in `index.html` + `src/hooks/useTheme.js`, localStorage key `sg-theme`). Variant declared in `src/index.css` as `@custom-variant dark (&:where(.dark, .dark *));`. Semantic tokens (`--canvas`, `--surface`, `--ink`, `--ink-soft`, `--ink-faint`, `--line`, `--primary`, `--accent`, `--warm`, `--brand`...) already have `.dark` overrides and are exposed via `@theme inline` as `bg-canvas`, `text-ink`, etc.
- Do NOT add dependencies to package.json. Do NOT redesign; keep the calm style and the existing dark pattern (`dark:bg-<hue>-400/10 dark:ring-<hue>-400/25`, used in MoodCheck, Footer, Cost, Understand, `src/lib/tones.js`).

## Root cause of the reported bug ("Kalau hari ini terasa terlalu berat" stays bright at night)

`src/components/sections/CrisisHelp.jsx` line 13, the panel inside `<section id="bantuan">`:

```
bg-coral-50 ... dark:bg-coral-950/40 dark:ring-coral-400/25
```

The coral palette in `src/index.css` `@theme` stops at `--color-coral-900`. There is no `--color-coral-950`, and "coral" is not a Tailwind default palette, so Tailwind silently emits no CSS for `dark:bg-coral-950/40`. In dark mode the panel keeps `bg-coral-50` (#fdf3f1, luminance ~0.92) while text switches to the light `--ink`/`--ink-soft` tokens: a bright panel with near-white text (very low contrast). Code-wide grep shows this is the only undefined shade used (all other shades used — leaf 50–950, sprout 200–500, tide 50–700, coral 50–700, night-950 — are defined). The fix must still be confirmed in a real browser (step 1 reproduces, step 2 verifies).

Decision: change the class to `dark:bg-coral-400/10` instead of adding a `--color-coral-950` token. Rationale: it matches the existing crisis card in MoodCheck (`dark:bg-coral-400/10 dark:ring-coral-400/25`) and the Footer 119 pill, so the two crisis surfaces look the same at night, and it avoids widening the palette.

## Temp verification harness (used by steps 1, 3, 4)

All temp files live in `c:\Users\babaj\OneDrive\Documents\SahabatGinjal\.agents\tasks\darkmode-fix\tmp\` (outside `src/`, removed in step 5). The script resolves `puppeteer-core` from the project's `node_modules`.

- Install: `npm i --no-save puppeteer-core` (run in project root). This must not change package.json / package-lock.json; confirm with `git diff --stat` afterwards.
- Browser: `C:\Program Files\Google\Chrome\Application\chrome.exe`, else `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` (pick the first that exists with `Test-Path`).
- Server: `npm run build` then start `npm run preview -- --port 4173 --strictPort` in the background; URL `http://localhost:4173/`.
- Script `tmp\audit.mjs` (ESM, `import puppeteer from 'puppeteer-core'`), for each theme in [dark, light] and width in [390, 834, 1440] (height 900):
  1. `page.evaluateOnNewDocument(t => localStorage.setItem('sg-theme', t), theme)` so the inline script in index.html applies the theme before paint.
  2. `page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])` so Reveal/Stagger content is not stuck at opacity 0; additionally scroll the page in 600px steps to the bottom and back to fire `whileInView`, then wait ~800ms.
  3. Collect `console` errors/warnings and `pageerror` events; any error is a finding.
  4. Overflow: `document.documentElement.scrollWidth > window.innerWidth` is a finding; list elements whose `getBoundingClientRect().right > innerWidth + 1` (skip ones inside an ancestor with `overflow: hidden|clip`, and skip `aria-hidden` decorative blobs).
  5. Color parsing: computed colors may be `oklab(...)`/`color(srgb ...)` because of `color-mix()` in the `card`/`glass` utilities. Normalize any CSS color by painting it on a 1×1 canvas (`ctx.fillStyle = value; ctx.fillRect(0,0,1,1); getImageData`) to get RGBA.
  6. Background scan (dark only): every visible element (width and height ≥ 24px, opacity > 0, not `visibility:hidden`) whose own `background-color` alpha ≥ 0.5 and relative luminance (WCAG formula) > 0.7 is a finding. Gradients cannot be measured this way, so list every visible element with a non-`none` `background-image` in dark mode (excluding the `grain` layer and `.text-gradient`) for manual review in the screenshots. Allowlist (intentional, document them): the logo badge `span` from `BrandBadge` in `src/components/ui/Logo.jsx` (white backing for the JPEG logo), and inside `#tenang` the `light` Button variant and the active pattern pill (`bg-white text-night-950`) which sit on the always-dark night-sky panel.
  7. Contrast scan (both themes): for each element with a non-empty direct text node, visible, not inside `[aria-hidden="true"]`, and computed `color` alpha > 0 (skip `.text-gradient` elements whose color is transparent): effective background = composite ancestors' `background-color` from the root down (start from body's canvas color) over each other with alpha. Ratio < 4.5 for normal text, or < 3.0 for large text (font-size ≥ 24px, or ≥ 18.66px with weight ≥ 700), is a finding. Also apply the element's own `color` alpha (e.g. `text-white/70`) by compositing over the effective bg. Elements over images/gradients (Hero/CalmRoom night-sky) report "needs visual check" rather than pass/fail if an ancestor has a `background-image`.
  8. Write `tmp\report-<theme>-<width>.json` with: findings arrays (bg, contrast, overflow, console), plus `crisis`: computed background-color (raw and RGBA) and luminance of `#bantuan .shell > div > div` (the rounded panel; select via `document.querySelector('#bantuan [class*="rounded-[2.5rem]"]')`) and the computed color + contrast of `#judul-bantuan`.
  9. Screenshots at 390 and 1440 for both themes: for each `section[id]` plus `header`, `footer`, and full page, `element.screenshot()` to `tmp\shots\<theme>-<width>-<id>.png`. Section ids: `bantuan`, `tenang`, `mitos`, `langkah`, and all others found by `document.querySelectorAll('section[id]')`.
  10. Also exercise interactive dark states once at 1440 dark: flip the first Myths card (click), pick a mood in MoodCheck including the crisis mood, check a FirstDay bag item, open a Faq item, switch the DialysisOptions tab, open MobileMenu at 390 (menu button), then rerun the bg/contrast scan on the changed region and screenshot it.
- Run: `node .agents\tasks\darkmode-fix\tmp\audit.mjs`. Inspect the JSON reports and view the screenshots (read the PNGs) before deciding fixes.

# Steps

- [ ] 1. Baseline and reproduce the bug before changing code.
      Run `npm run build` and `npm run lint` (record that both are clean or note existing issues). Install puppeteer-core, create the harness above, start the preview server, and run it. Confirm the reproduction: in `report-dark-*.json`, `crisis.background` is coral-50 (~rgb(253,243,241), luminance > 0.7) and `#judul-bantuan` contrast is far below 4.5. Save the full baseline findings list to `.agents\tasks\darkmode-fix\baseline-findings.md` (short list: file/selector, theme, width, issue) — this drives step 3.
      Files: .agents/tasks/darkmode-fix/tmp/audit.mjs (temp), .agents/tasks/darkmode-fix/baseline-findings.md
      Verify: reports exist for 6 theme/width combos; CrisisHelp panel is flagged in dark at all widths; screenshot `dark-1440-bantuan.png` shows the bright panel.

- [ ] 2. Fix CrisisHelp dark background.
      In `src/components/sections/CrisisHelp.jsx` line 13 replace `dark:bg-coral-950/40` with `dark:bg-coral-400/10` (keep `dark:ring-coral-400/25`). Then check the rest of the section in dark: the blob `bg-coral-300/40 dark:bg-coral-500/20` (fine), the icon tile `bg-coral-600 text-white` (white on #c44b38 ≈ 4.9:1, keep), help cards `bg-surface/90 ring-line` with number color from `TONES[line.tone].text` (`text-warm`/`text-accent`/`text-primary`, all light at night), `text-ink-faint` "lalu tekan 8", and the `112` link `text-warm`. Fix only what the scan flags. `src/data/help.js` needs no change (tones `coral`/`tide`/`leaf` all exist in `src/lib/tones.js`).
      Files: src/components/sections/CrisisHelp.jsx
      Verify: `npm run build` and `npm run lint` clean; restart preview, rerun the harness: `crisis.background` luminance < 0.1 in dark at 390/834/1440, `#judul-bantuan` and body text contrast ≥ 4.5; `dark-390-bantuan.png` and `dark-1440-bantuan.png` show a dark panel with a faint coral tint; `light-*-bantuan.png` unchanged (still coral-50).

- [ ] 3. Audit every remaining component and fix what is wrong (smallest class-level change, reuse tokens and the existing `dark:` patterns).
      Use the baseline findings plus these per-file checks (code-read observations included so nothing is skipped):
      - sections/Hero.jsx: headline `text-gradient` (has dark override in index.css), SVG `stroke="var(--color-coral-400)"` underline visibility on dark canvas, buttons, contrast of kicker/subtitle text.
      - sections/FiltrationOrb.jsx: `bg-surface/60` disc, dashed rings `border-tide-400/40`/`border-leaf-400/40`, `stroke="white"` dashed paths (decorative; in light mode nearly invisible on light disc — leave unless clearly broken), `Tag` pills (`glass text-ink ring-line`), drops fills. Check Tag overflow at 390px (`right-0`, `left-0`, long "mesin jadi ginjal keduamu").
      - sections/Marquee.jsx: text color/contrast, `fade-x` mask, horizontal overflow at 390.
      - sections/MoodCheck.jsx: pulse dots `bg-tide-300/40`, `bg-leaf-300/40`, gradient `from-leaf-300 to-tide-300` (decorative; accept unless glaring), mood buttons selected/hover state in dark, crisis card `bg-coral-50 dark:bg-coral-400/10` and its `warm` buttons.
      - sections/Understand.jsx: fact tiles `bg-tide-50/80 dark:bg-tide-400/10`, bar gradient `from-coral-500 via-sprout-400 to-leaf-500`, any track background.
      - sections/DialysisOptions.jsx: tab list active/inactive states and focus ring in dark; panel backgrounds; any `TONES[...].soft/chip` usage.
      - sections/FirstDay.jsx: timeline line gradient, checklist items checked state `bg-leaf-500 text-white ring-leaf-500` (icon, ≥3:1 non-text is fine) and unchecked `ring-line-strong`; label text contrast.
      - sections/Myths.jsx: back face `card bg-leaf-50 dark:bg-leaf-950` — both `card` utility and `bg-*` set `background-color`; confirm in the flipped screenshot (step harness 10) that the dark back face is leaf-950 and light is leaf-50, and `text-primary` kicker + `text-ink` fact pass 4.5:1. Front face `text-ink-faint` hint.
      - sections/DailyLife.jsx, Cost.jsx, Stories.jsx, Faq.jsx: chips from `TONES[*].chip`, soft panels, `bg-coral-100 text-coral-700 dark:bg-coral-400/15 dark:text-coral-300` icon tiles (Cost), Faq open/closed and hover states, Stories quote cards and avatars.
      - sections/CalmRoom.jsx: wrapper forces `.dark night-sky` (always dark by design). Check `text-white/60` (`text-xs` hint, line ~100) and `text-white/70` contrast on night-950 (should pass; fix only if < 4.5), `bg-white/5` quote card, `text-tide-200` counter; confirm it looks identical in both themes.
      - sections/CallToAction.jsx: `card` panel, `bg-leaf-300/35 dark:bg-leaf-500/15` blob, input `bg-surface ring-line-strong placeholder:text-ink-faint` (placeholder contrast ≥ 4.5 in dark), disabled "Salin semua" button legibility, saved-question rows `bg-surface-muted/70`, delete button hover.
      - layout/Navbar.jsx: transparent vs `glass` solid states in dark, active-link indicator color, `warm` button; layout/MobileMenu.jsx: panel background (must be dark at night, not white), backdrop, link and close-button contrast at 390; layout/Footer.jsx: 119 pill (has dark overrides), link colors; layout/FloatingActions.jsx: `glass` pills, `bg-tide-400/500` dot; layout/ScrollProgress.jsx: gradient bar (fine both themes); layout/AuraBackground.jsx: `--glow-*` and `grain` (dark values exist); layout/ThemeToggle.jsx: icon/label contrast and focus ring in both themes, `aria-label`/`aria-pressed` reflect the current theme.
      - ui/Button.jsx: `primary` shadow `rgb(15_42_34/0.6)` (invisible at night, acceptable), `secondary`, `ghost`, `warm` (white on coral-600 OK; hover coral-700), `light`/`outlineLight` used only inside CalmRoom (OK); disabled styles. ui/Logo.jsx: `bg-white ring-black/5` badge is intentional for the JPEG logo — keep; consider `dark:ring-white/10` only if the badge edge looks harsh in screenshots. ui/IconBadge.jsx, Accent.jsx, SectionHeading.jsx (number/kicker colors), Reveal.jsx, Stagger.jsx (content must not stay hidden).
      - index.html / useTheme.js: no console errors on load or toggle; theme persists across reload; toggling via ThemeToggle switches CrisisHelp too (click the toggle in the harness at 1440 starting from light, then rescan `#bantuan`).
      For each fix, record in `baseline-findings.md` the file, the class change, and why. Leave intentional items (allowlist above) unchanged and note them. Do not change light-mode appearance except where light mode itself fails AA.
      Files: any of src/components/sections/*.jsx, src/components/layout/*.jsx, src/components/ui/*.jsx, src/lib/tones.js, src/index.css (only if a token-level fix is cleaner than per-file classes)
      Verify: `npm run build` and `npm run lint` clean after the edits; rerun harness — every non-allowlisted bg/contrast finding from the baseline is gone.

- [ ] 4. Final full verification.
      Rebuild (`npm run build`), `npm run lint`, restart preview, rerun the harness for dark+light at 390/834/1440 and the interaction pass.
      Files: none (temp reports only)
      Verify (all must hold):
      - build and lint exit 0 with no errors.
      - Dark mode: zero non-allowlisted elements with background luminance > 0.7; zero text elements below 4.5:1 (3:1 large text) except "needs visual check" items confirmed OK in screenshots.
      - Light mode: no new contrast failures versus baseline.
      - `#bantuan` panel luminance < 0.1 in dark at all widths; heading contrast ≥ 4.5.
      - No horizontal overflow at 390, 834, 1440; no console errors or page errors in either theme or during interactions.
      - Screenshots of every section at 390 and 1440 in both themes reviewed (read the PNGs); nothing stays bright at night, style unchanged otherwise.
      Summarize results (fixed issues per file, allowlisted items, remaining caveats) in `baseline-findings.md` under a "Hasil akhir" heading.

- [ ] 5. Cleanup.
      Stop the preview server (stop the background process; if needed `Get-NetTCPConnection -LocalPort 4173 | ForEach-Object { Stop-Process -Id $_.OwningProcess }`). Delete `.agents\tasks\darkmode-fix\tmp\` (scripts, reports, screenshots). Run `npm uninstall --no-save puppeteer-core`. Run `git diff --stat` and `git status --short`: package.json and package-lock.json must NOT appear; only intended `src/` files (and `.agents/` task notes) may be changed. `dist/` is gitignored, so rebuilt output is fine. `.agents/` is not gitignored; leave `plan.md`/`baseline-findings.md` in place, untracked. Do NOT commit or push.
      Verify: `git diff --stat` shows only src/ component changes; `Test-Path node_modules\puppeteer-core` is False; port 4173 free.
