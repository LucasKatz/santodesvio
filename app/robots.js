// app/robots.js
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] }],
    sitemap: "https://santodesvio.com.ar/sitemap.xml",
  };
}