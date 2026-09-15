type PagesFunction = (context: {
  request: Request;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => Response | Promise<Response>;

const HSTS_HEADER = 'max-age=63072000; includeSubDomains; preload';

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  if (url.hostname === 'activeloom.ca') {
    url.hostname = 'www.activeloom.ca';
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
