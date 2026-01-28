import { getLayout } from "../utils/layout.js";
import { sendHtml } from "../utils/response.js";

export function getHome(req, res) {
  const content = `
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
  `;
  const html = getLayout("Inicio", content);
  sendHtml(res, html);
}
