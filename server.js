import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const server = http.createServer(async (req, res) => {
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".txt": "text/plain",
  };

  // 1. Analizar la URL (req.url)
  const pathname = req.url;

  // 2. Crear las reglas (if) para cada ruta:
  //    - "/api/health" -> return JSON
  if (pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = { status: "ok" };
    const response = JSON.stringify(data);
    res.end(response);
  }
  //    - "/api/time"   -> return JSON
  if (pathname === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = { time: new Date().toISOString() };
    const response = JSON.stringify(data);
    res.end(response);
  }
  //    - "/"           -> return HTML
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    // HTML que debes devolver en la raíz "/"
    const html = `
    <!doctype html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vanilla Node Web Server</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
        <section>
          <h2>Imagen de Node</h2>
          <img src="/node.jpg" alt="Imagen de node" width = "120"/>
          <figcaption> Imagen de NodeJs</figcaption>
        </section>
    </body>
    </html>
  `;
    res.end(html);
  }

  const PUBLIC_DIR = path.resolve("public"); // Ruta absoluta
  const filePath = path.join(PUBLIC_DIR, pathname); // public/styles.css
  const extname = path.extname(pathname).toLowerCase();
  console.log({ PUBLIC_DIR, filePath, extname });

  const mineType = mimeTypes[extname];
  console.log(mineType);

  if (mineType) {
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": mineType });
      res.end(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("El archivo no existe");
      } else {
        console.error("Error inesperado: ", error.message);
      }
      res.writeHead(400);
      res.end();
    }
  }
});

server.listen(3000);
