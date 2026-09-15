# www.activeloom.ca

Product and marketing website for **ActiveLoom** ([activeloom.ca](https://www.activeloom.ca)), the open source platform for reusable engineering workflows for coding agents.

Modeled on the developer-first, terminal-native aesthetic of `herdr.dev`, with interactive multi-agent showcases, cryptographic commit ledger inspectors, dual `ink`/`paper` ground modes, and adoption tier guides.

## Stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS 3
- **Edge Routing:** Cloudflare Pages with `functions/_middleware.ts` (301 apex `activeloom.ca` to `www.activeloom.ca` with HSTS)
- **Deployment:** Cloudflare Pages auto-deploy on push to `main`

## Commands

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Type check
pnpm check

# Build production bundle
pnpm build

# Preview build locally
pnpm preview
```

## License

Apache 2.0 &mdash; Loomantix OSS.
