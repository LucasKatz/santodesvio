// app/sitemap.js
export default function sitemap() {
  const base = "https://santodesvio.com.ar";
  return [
    { url: base,                lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/birras`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/festival`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/merch`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/cart`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/contacto`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}