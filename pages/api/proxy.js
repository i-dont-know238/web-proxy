export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const targetUrl = new URL(url);
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WebProxy/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const contentType = response.headers.get('content-type') || '';
    let body = await response.text();

    // Basic HTML rewriting for relative links (very minimal)
    if (contentType.includes('text/html')) {
      const base = targetUrl.origin;
      body = body.replace(/(href|src)=["'](?!https?:|\/\/|data:|#|mailto:)([^"']+)["']/gi, (match, attr, path) => {
        try {
          const absolute = new URL(path, targetUrl).toString();
          return `${attr}="/api/proxy?url=${encodeURIComponent(absolute)}"`;
        } catch {
          return match;
        }
      });
    }

    res.setHeader('Content-Type', contentType || 'text/html');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(response.status).send(body);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch URL', details: err.message });
  }
}
