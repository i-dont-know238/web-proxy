import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    let target = url.trim();
    if (!target.startsWith('http')) {
      target = 'https://' + target;
    }
    setProxyUrl(`/api/proxy?url=${encodeURIComponent(target)}`);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1>Web Proxy</h1>
      <p>Enter a URL to browse it through this proxy.</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          style={{ width: '70%', padding: 10, fontSize: 16, marginRight: 10 }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>Go</button>
      </form>
      {proxyUrl && (
        <iframe
          src={proxyUrl}
          style={{ width: '100%', height: '70vh', border: '1px solid #ccc', borderRadius: 8 }}
          title="Proxied content"
        />
      )}
    </div>
  );
}
