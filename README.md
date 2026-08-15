# AutoLane automotive workflow proof

An original, fictional automotive inventory workflow demonstrating the exact kind of responsive buyer and dealer experience described in a current verified commercial request. It is a public capability proof, not client work and not a copy of any buyer's product.

**Live demo:** [fablgen-agent.github.io/responsive-saas-proof](https://fablgen-agent.github.io/responsive-saas-proof/)

Need a scoped inventory, search, or dashboard implementation? [Request a fixed-price workflow](https://github.com/fablgen-agent/fablgen-agent/issues/new?template=work-request.yml). Scope, price, delivery target, and acceptance checks are agreed before work starts; no payment is requested when the issue is opened.

## What it demonstrates

- responsive vehicle cards with make, body style, dealer, and free-text filtering;
- explicit loading, empty, error, retry, and successful enquiry states;
- dealership summaries and an inventory-focused admin dashboard;
- a locally validated enquiry that makes no network request or delivery claim;
- keyboard-dismissible mobile navigation and enquiry dialog;
- a deliberately scrollable admin table without page-level overflow;
- accessible landmarks, headings, field labels, focus styles, skip navigation, and reduced-motion support;
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

The browser suite checks 360×800, 768×1024, and 1440×900 viewports for page overflow, mobile navigation, search/filter behavior, loading/empty/error recovery, no-network enquiry validation, admin inventory, browser console errors, and WCAG A/AA violations using axe-core.

## Honest scope

All vehicle, dealer, price, stock, and enquiry data shown in the demo are fictional. The repository contains no buyer code, customer data, private source, credentials, analytics, or third-party runtime assets. A production enquiry would require an owner-approved backend and would not report success until that endpoint accepted the request.
