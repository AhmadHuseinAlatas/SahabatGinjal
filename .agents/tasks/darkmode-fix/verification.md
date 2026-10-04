# Verification: dark-mode fix

## Change
`src/components/sections/CrisisHelp.jsx` line 13: `dark:bg-coral-950/40` → `dark:bg-coral-400/10`.
Root cause: `--color-coral-950` is not defined in `src/index.css` `@theme` (coral stops at 900), so Tailwind emitted no rule and the panel kept `bg-coral-50` in dark mode while the text switched to the light dark-mode tokens. No other undefined shades in `src/` (grep for coral-950, tide-950, sprout-50/100/600+, night-50..600: no matches).

## Build / lint (after the change)
- `npm run build`: `✓ built in 1.36s`, no warnings or errors.
- `npx oxlint` (`npm run lint`): exit code 0, no diagnostics.
- Both were also clean before the change.

## Browser check (built site)
- Server: `vite preview` on port 4173, serving `dist/` (started from the harness through Vite's `preview()` API, which is what `npm run preview` runs; the agent shell blocks starting servers directly). Closed at the end of each run.
- Browser: puppeteer-core (installed with `npm i --no-save`) driving `C:\Program Files\Google\Chrome\Application\chrome.exe`, headless.
- Per run: themes dark/light set through `localStorage['sg-theme']` before load × widths 390/834/1440. prefers-reduced-motion=reduce, full scroll to trigger whileInView, fonts ready.
- Scans: (a) dark only, elements ≥24px with own bg alpha ≥0.5 and WCAG luminance >0.7; (b) text contrast with ancestor backgrounds composited (4.5:1 normal, 3:1 large); (c) horizontal overflow; (d) console errors/warnings and pageerror. Colors normalised through canvas (handles oklab/color-mix).
- Screenshots of every `section[id]` + footer + top at 390 and 1440 in both themes, plus interaction shots and the open mobile menu at 390. All reviewed.

### Before fix (reproduced)
Dark 390/834/1440: `#bantuan` panel bg rgb(253,243,241), luminance 0.913. `#judul-bantuan` contrast 1.06, body paragraphs 1.63, `112` link 1.75, "lalu tekan 8" 4.47. Screenshot showed a bright panel with near-white text.

### After fix
| run | bright bg (non-allowlist) | contrast fails | overflow | console |
|-----|---------------------------|----------------|----------|---------|
| dark-390 / 834 / 1440 | 0 | 0 real (see notes) | 0 | 0 |
| light-390 / 834 / 1440 | n/a | 0 real (same as baseline) | 0 | 0 |
| interactions dark-1440 | 0 | 0 real | 0 | 0 |
| toggle light→dark 1440 | 0 | – | – | 0 |
| mobile menu dark-390 | 0 | 0 real | – | 0 |

CrisisHelp in dark (all widths, and after toggling from light with ThemeToggle): panel rgba(coral-400, 0.1) composited = rgb(34,41,35), luminance 0.02. Heading 12.95:1, body 8.41:1. Screenshots `dark-390-bantuan` and `dark-1440-bantuan` show a dark panel with a faint coral tint. Light is unchanged: coral-50, heading 14.02:1.

Notes on items the scan still lists:
- Allowlisted bright backgrounds: `BrandBadge` white circle (header, hero, footer) for the JPEG logo; `#tenang` active breath-pattern pill and "Mulai bernapas" `light` button, which sit on the always-dark night-sky panel.
- `#pilihan` active tab text: false positive. The pill background is an absolutely positioned sibling span. Checked by hand: dark #071512 on #86cd9e = 9.9:1; light #fff on #25643a = 7.1:1.
- `#langkah` "Salin semua" while disabled (no questions saved): 3.84 dark / 2.73 light. Disabled controls are exempt from WCAG 1.4.3; left as is.

Interactions exercised: flip the first myth card (dark back face leaf-950), pick moods including "Putus asa" (crisis block `dark:bg-coral-400/10`), tick a bag checklist item, open an FAQ item, switch the dialysis tab, save a question, open the mobile menu at 390.

## Cleanup
Temp harness, reports, and screenshots in `.agents/tasks/darkmode-fix/tmp/` deleted. puppeteer-core removed with `npm uninstall --no-save puppeteer-core`. No preview server left running. `git diff --stat` shows only `src/components/sections/CrisisHelp.jsx`; package.json and package-lock.json are unchanged. Nothing committed.
