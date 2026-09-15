type PagesFunction = (context: {
  request: Request;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => Response | Promise<Response>;

const HSTS_HEADER = 'max-age=63072000; includeSubDomains; preload';

/**
 * Canonical hostname for the developer platform site.
 * Defaults to 'activeloom.dev' (apex, matching herdr.dev).
 * All traffic from activeloom.ca, www.activeloom.ca, and www.activeloom.dev 301-redirects here.
 */
const CANONICAL_HOST = 'activeloom.dev';

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // Redirect all secondary domains and www subdomains to canonical host
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

  return context.next();
};
