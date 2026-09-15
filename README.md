# www.activeloom.ca

Source for **[activeloom.dev](https://activeloom.dev)**, the website for [ActiveLoom](https://github.com/loomantix/activeloom): open-source, reusable engineering workflows for coding agents.

`activeloom.dev` is the canonical host. `activeloom.ca`, `www.activeloom.ca`, and `www.activeloom.dev` 301 to it.

## Stack

- **Framework:** Astro 5 (static output) with Tailwind CSS 3
- **Edge:** Cloudflare Pages. `functions/_middleware.ts` handles the canonical-host 301s, the `/agent` shortcut, and plain-text content negotiation for `curl` on `/`.
- **Headers:** `public/_headers` (CSP and security headers; `*.pages.dev` is `noindex`)
- **Agent-facing content:** `public/llms.txt`, `public/llms-full.txt`, `public/agent-guide.md`
- **Deployment:** Cloudflare Pages builds `main` on merge. Changes go through pull requests.

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # local dev server
pnpm check     # type check
pnpm build     # production build to dist/
pnpm preview   # preview the build
```

## Security

Report vulnerabilities to security@loomantix.com (see [`/.well-known/security.txt`](https://activeloom.dev/.well-known/security.txt)).

## License

Code is licensed under the [Apache License 2.0](LICENSE). The Loomantix and ActiveLoom names and marks are not covered by that license; see [NOTICE](NOTICE).
