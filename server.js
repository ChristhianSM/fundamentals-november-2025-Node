import http from "node:http";

const server = http.createServer((req, res) => {
  // 1. Analizar la URL (req.url)
  const url = req.url;

  // 2. Crear las reglas (if) para cada ruta:
  //    - "/api/health" -> return JSON
  if (url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = { status: "ok" };
    const response = JSON.stringify(data);
    res.end(response);
  }
  //    - "/api/time"   -> return JSON
  if (url === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = { time: new Date().toISOString() };
    const response = JSON.stringify(data);
    res.end(response);
  }
  //    - "/"           -> return HTML
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    // HTML que debes devolver en la raíz "/"
    const html = `
    <!doctype html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vanilla Node Web Server</title>
    </head>
    <body>
        <h1>Bienvenido a Vanilla Node Web Server</h1>
        <section>
          <h2>Prueba la API</h2>
          <ul>
            <li><a href="/api/health">/api/health</a></li>
            <li><a href="/api/time">/api/time</a></li>
          </ul>
        </section>
    </body>
    </html>
  `;
    res.end(html);
  }
});

server.listen(3000);
