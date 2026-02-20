# VantaWeb Error Log

## Issue #1: Logos Not Displaying
**Date:** 2026-02-20
**Symptom:** Logo grid section shows "Custom Logo Design" header but no logos visible.
**Root Causes (multiple, fixed sequentially):**

1. **Scroll animation hiding content** — `data-aos="fade-up"` set `opacity: 0` on elements. The IntersectionObserver was supposed to add `aos-animate` class on scroll to make them visible, but dynamically created elements were never registered with the observer.
   - **Fix:** Removed all `data-aos` attributes from HTML. Removed animation CSS entirely.

2. **JS dynamically creating logos over hardcoded HTML** — `initLogoLoader()` in script.js was appending 20 JS-created logo cards on top of 20 already hardcoded in HTML = 40 total, half broken (used fetch + `display:none` divs that never resolved on `file://`).
   - **Fix:** Rewrote script.js from scratch. Removed all dynamic logo creation. Logos are purely HTML `<img>` tags now.

3. **Browser cache serving old JS** — Even after fixing files, browser served cached `script.js` that still had the old `initLogoLoader()` with broken fetch logic.
   - **Fix:** Added `?v=TIMESTAMP` cache-busting query strings to CSS/JS links. Added `<meta>` no-cache headers. Added inline `<style>` safety net forcing `.logo-item` to always be visible.

**Prevention:** Logos are hardcoded HTML `<img>` tags. No JavaScript dependency. Inline CSS safety net ensures visibility even if external CSS is cached/broken.

---

## Issue #2: "Source" Button Appearing on Website Cards
**Date:** 2026-02-20
**Symptom:** Hovering over website preview images showed both "View Live" and "Source" buttons. Source linked to GitHub repo.
**Root Causes:**

1. **HTML had Source links** — Original HTML had `<a class="btn-code">Source</a>` links next to each View Live button.
   - **Fix:** Removed all 6 Source links from HTML.

2. **JS recreating Source buttons** — Old `initLogoLoader()` in script.js had templates that included Source buttons in dynamically created elements.
   - **Fix:** Rewrote script.js completely — no dynamic HTML generation.

3. **CSS still styled .btn-code** — Even though HTML was clean, the `.btn-code` class styling remained.
   - **Fix:** Removed `.btn-code` from CSS. Added inline `<style>` with `.btn-code { display: none !important; }` as permanent kill switch.

4. **Browser cache** — Old cached files kept bringing back the Source button.
   - **Fix:** Cache-busting query strings + no-cache meta headers.

**Prevention:** Inline CSS `display: none !important` on `.btn-code` means even if old cached JS somehow creates a Source button, it will be hidden.

---

## Issue #3: View Live Buttons Not Clickable
**Date:** 2026-02-20
**Symptom:** View Live buttons on website cards couldn't be clicked / were invisible.
**Root Cause:** Buttons were inside `.website-overlay` which had `opacity: 0` and only showed on hover. Hover didn't trigger reliably on all browsers/devices.
**Fix:** Changed overlay to always-visible bottom gradient (`transparent 30%` → `rgba(0,0,0,0.7) 100%`). Button centered in overlay, always clickable.

---

## Issue #4: Image Artifacting Line at Bottom of Website Cards
**Date:** 2026-02-20  
**Symptom:** 1px line visible at bottom edge of website card images on hover.
**Root Cause:** Sub-pixel rendering gap when `transform: scale(1.05)` applied to image inside `overflow: hidden` container. Inline baseline gap also contributed.
**Fix:** Made image `height: calc(100% + 2px)` with `margin-bottom: -2px` and `display: block`. Overflow clips it clean.

---

## Issue #5: VantaWeb Logo Disappearing
**Date:** 2026-02-20
**Symptom:** VantaWeb logo in hero/nav/footer not rendering.
**Root Cause:** Was originally text-based (`<span class="logo-text">VantaWeb</span>`), then replaced with `<img>` pointing to SVG file. File existed but CSS was missing for `.hero-logo-img` and `.nav-logo-img`.
**Fix:** Added CSS for both classes. Logo renders via `<img>` tag — no JS dependency.

---

## General Prevention Measures
1. **No JavaScript dependency for content** — All logos and buttons are pure HTML. JS only handles interactivity (popups, navigation, forms).
2. **Cache-busting** — All CSS/JS links have `?v=TIMESTAMP` query strings. Update timestamp on every deploy.
3. **No-cache meta headers** — Forces browsers to revalidate on every load.
4. **Inline CSS safety net** — Critical visibility rules are inlined in `<head>` so they can't be affected by external CSS caching.
5. **`.btn-code { display: none !important; }`** — Permanent kill switch for Source button.

---

*Last updated: 2026-02-20 04:43 GMT+3*
