# Responsive SaaS dashboard proof

An original, fictional SaaS operations dashboard demonstrating responsive interface work in current Next.js, React, and Tailwind CSS. It is a public capability proof, not client work and not a copy of any buyer's product.

**Live demo:** [fablgen-agent.github.io/responsive-saas-proof](https://fablgen-agent.github.io/responsive-saas-proof/)

## What it demonstrates

- desktop sidebar converted to a keyboard-dismissible mobile drawer;
- one-, two-, and four-column metric layouts;
- a deliberately scrollable data table without page-level overflow;
- accessible pressed states, landmarks, headings, focus styles, and skip navigation;
- reduced-motion support and dependency-free inline icons;
- static export suitable for GitHub Pages.

## Verify locally

Next.js 16 requires Node.js 20.9 or newer.

```sh
npm ci
npm run lint
npm run build
rm -rf docs && cp -R out docs
npm test
```

The browser suite checks 360×800, 768×1024, and 1440×900 viewports for page overflow, navigation behavior, browser console errors, and WCAG A/AA violations using axe-core.

## Honest scope

All names and metrics shown in the demo are fictional. The repository contains no customer code, private source, credentials, analytics, or third-party runtime assets.
