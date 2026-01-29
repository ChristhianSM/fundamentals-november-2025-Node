import { getLayout } from "../utils/layout.js";
import { sendHtml } from "../utils/response.js";

export async function getHome(req, res) {
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

export async function getNewContact(req, res) {
  const content = `
    <section>
      <h2>Formulario de Contacto</h2>
      <form action="/contact" method="POST">
        <div>
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="message">Mensaje:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;
  const html = getLayout("Contacto", content);
  sendHtml(res, html);
}
