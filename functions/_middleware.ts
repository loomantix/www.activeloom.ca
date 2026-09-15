type PagesFunction = (context: {
  request: Request;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => Response | Promise<Response>;

const HSTS_HEADER = 'max-age=63072000; includeSubDomains; preload';
const CANONICAL_HOST = 'activeloom.dev';

const CLI_TERMINAL_OUTPUT = `
\x1b[1;32m◱ active|loom\x1b[0m — Reusable engineering workflows for coding agents
\x1b[2mClaude Code · OpenAI Codex · Google Antigravity / Gemini · Apache 2.0\x1b[0m

\x1b[1mQuick Start:\x1b[0m
  $ \x1b[36mnpx activeloom init --harness codex,claude,gemini\x1b[0m

\x1b[1mCore Engineering Skills:\x1b[0m
  • \x1b[33mgrill\x1b[0m            Relentless pre-code design & requirements stress test
  • \x1b[33mdiagnosing-bugs\x1b[0m  Disciplined root-cause analysis and reproduction in isolation
  • \x1b[33mfeature-dev\x1b[0m      Guided feature development with codebase discovery
  • \x1b[33mcritique\x1b[0m         PR-first adversarial review. Findings posted inline before edit.
  • \x1b[33magent-loop\x1b[0m       Bounded autonomous issue queue execution in isolated worktrees

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
  if (url.pathname === '/agent' || url.pathname === '/agent-guide') {
    url.pathname = '/agent-guide.md';
    return Response.redirect(url.toString(), 302);
  }

  // 3. CLI / Terminal Content Negotiation
  // When requested from curl or with explicit text/plain at root path, return ANSI terminal text
  if (
    url.pathname === '/' &&
    (userAgent.startsWith('curl/') || (accept.includes('text/plain') && !accept.includes('text/html')))
  ) {
    return new Response(CLI_TERMINAL_OUTPUT.trim() + '\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Strict-Transport-Security': HSTS_HEADER,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return context.next();
};
