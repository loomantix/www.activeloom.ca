type PagesFunction = (context: {
  request: Request;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => Response | Promise<Response>;

const HSTS_HEADER = 'max-age=63072000; includeSubDomains; preload';
const CANONICAL_HOST = 'activeloom.dev';
const VARY_HEADER = 'User-Agent, Accept';

const CLI_TERMINAL_OUTPUT = `
Agents: start at https://activeloom.dev/llms.txt (index) or https://activeloom.dev/agent-guide.md (task-to-skill selector).

\x1b[1;32m◱ active|loom\x1b[0m — Reusable engineering workflows for coding agents
\x1b[2mClaude Code · OpenAI Codex · Gemini / Antigravity (Agy) · Apache 2.0\x1b[0m

\x1b[1mQuick Start:\x1b[0m
  $ \x1b[36mnpx activeloom detect\x1b[0m                              \x1b[2m# inspect this repo, writes nothing\x1b[0m
  $ \x1b[36mnpx activeloom add critique --harness claude\x1b[0m       \x1b[2m# try one skill personally\x1b[0m
  $ \x1b[36mnpx activeloom init --harness claude --dry-run\x1b[0m     \x1b[2m# preview a repository install\x1b[0m

\x1b[1mPlan & Build:\x1b[0m
  • \x1b[33mgrill\x1b[0m / \x1b[33mproduct-grill\x1b[0m  Stress-test a design / whether to build it, before code
  • \x1b[33mdiagnosing-bugs\x1b[0m        Reproduce, find the root cause, then the smallest fix
  • \x1b[33missues\x1b[0m                 Work one issue end to end to a draft PR
  • \x1b[33mbacklog-refinement\x1b[0m     Make the backlog agent-ready
  • \x1b[33magent-loop\x1b[0m             Bounded autonomous issue queue in isolated worktrees

\x1b[1mReview:\x1b[0m
  • \x1b[33mcritique\x1b[0m / \x1b[33mdeepcritique\x1b[0m  PR-first adversarial review (Lean / Deep); findings before fixes
  • \x1b[33mred-team\x1b[0m               How a reviewed PR fails once live

\x1b[1mHerd Orchestration (herdr):\x1b[0m
  • \x1b[33mhorch\x1b[0m                  Drive a whole workspace; merge converged work to the integration branch
  • \x1b[33mhreview\x1b[0m                Review chain on a PR, one engine per visible pane, until it converges
  • \x1b[33mhgrill\x1b[0m                 Grill an issue across engines; post assumptions for your sign-off
  • \x1b[33mhloop\x1b[0m                  Batch of agent-ready issues: build, review, ship through horch's gate
  • \x1b[33mhred-team\x1b[0m              Red-team a reviewed PR; fix blockers, file the rest as issues
  • \x1b[33mhpromote\x1b[0m               Run the promotion recipe in visible panes; the merge stays yours
  • \x1b[33mauto-glance\x1b[0m            A non-author model stands in for the human glance (opt-in)
  \x1b[2mNeeds herdr 0.9.0+, the Codex harness in the repo, a review profile and gh;
  horch merges only with ship-staging and a ship section in .activeloom-herd.json.\x1b[0m

\x1b[1mAI Agent Resources:\x1b[0m
  Documentation Index: \x1b[4mhttps://activeloom.dev/llms.txt\x1b[0m
  Agent Entry Guide:   \x1b[4mhttps://activeloom.dev/agent-guide.md\x1b[0m
  Full Context Bundle: \x1b[4mhttps://activeloom.dev/llms-full.txt\x1b[0m
  GitHub Repository:   \x1b[4mhttps://github.com/loomantix/activeloom\x1b[0m
`;

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();
  const userAgent = context.request.headers.get('user-agent') || '';
  const accept = context.request.headers.get('accept') || '';

  // 1. Redirect secondary domains (activeloom.ca, www.activeloom.ca, www.activeloom.dev) to canonical host
  if (
    host === 'activeloom.ca' ||
    host === 'www.activeloom.ca' ||
    host === 'www.activeloom.dev'
  ) {
    url.hostname = CANONICAL_HOST;
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.toString(),
        'Strict-Transport-Security': HSTS_HEADER,
      },
    });
  }

  // 2. Route shortcuts for agents
  if (['/agent', '/agent/', '/agent-guide', '/agent-guide/', '/agent.md'].includes(url.pathname)) {
    url.pathname = '/agent-guide.md';
    return Response.redirect(url.toString(), 302);
  }

  // 3. CLI / Terminal Content Negotiation
  // When requested from curl or with explicit text/plain at root path, return ANSI terminal text.
  // Both representations of `/` carry Vary so no shared cache hands the ANSI text to a browser
  // (or the HTML to curl).
  if (url.pathname === '/') {
    if (userAgent.startsWith('curl/') || (accept.includes('text/plain') && !accept.includes('text/html'))) {
      return new Response(CLI_TERMINAL_OUTPUT.trim() + '\n', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Strict-Transport-Security': HSTS_HEADER,
          'Cache-Control': 'public, max-age=3600',
          Vary: VARY_HEADER,
        },
      });
    }

    const response = await context.next();
    const negotiated = new Response(response.body, response);
    negotiated.headers.set('Vary', VARY_HEADER);
    return negotiated;
  }

  return context.next();
};
