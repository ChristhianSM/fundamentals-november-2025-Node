import { getLayout } from "./layout.js";

export function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  const response = JSON.stringify(data);
  res.end(response);
}

export function sendErrorJson(res, message, status = 500) {
  const jsonError = {
    status,
    error: message,
  };
  sendJson(res, jsonError, status);
}

export function sendHtml(res, html, status = 200) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(html);
}

export function sendErrorHtml(res, message, status = 500) {
  const content = `
    <h1>Error ${status}</h1>
    <p>${message}</p>
    <a href="/">Inicio</a>
  `;
  const html = getLayout(`[Error]: ${status}`, content);
  sendHtml(res, html, status);
}
