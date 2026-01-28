export function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  const response = JSON.stringify(data);
  res.end(response);
}

export function sendHtml(res, html, status = 200) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(html);
}
