export const xml: string[] = [
  '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Tech Blog</title>\n  <item>\n    <title>New Release v2.0</title>\n    <link>https://example.com/v2</link>\n  </item>\n</channel>\n</rss>',
  '<?xml version="1.0" encoding="UTF-8"?>\n<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <GetUser xmlns="http://example.com/soap">\n      <UserId>42</UserId>\n    </GetUser>\n  </soap:Body>\n</soap:Envelope>',
  '<config>\n  <app name="my-service" version="1.0.0">\n    <database>\n      <host>localhost</host>\n      <port>5432</port>\n      <name>app_db</name>\n    </database>\n  </app>\n</config>',
  '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />\n  <rect x="20" y="30" width="60" height="40" fill="blue" opacity="0.5" />\n</svg>',
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://example.com/</loc>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>https://example.com/about</loc>\n    <priority>0.8</priority>\n  </url>\n</urlset>',
];
