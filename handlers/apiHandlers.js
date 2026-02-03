import path from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";
// import { parseUrlEncoded } from "../utils/parseBody.js";
import { sendErrorHtml, sendHtml } from "../utils/response.js";
import { getLayout } from "../utils/layout.js";
import { HttpError } from "../utils/errors.js";

export async function getHealth(req, res) {
  // throw new HttpError("Error con la base de datos", 400);
  const data = { status: "ok" };
  res.json(data);
}

export async function getTime(req, res) {
  const data = { time: new Date().toISOString() };
  res.json(data);
}

const DATA_DIR = path.join(import.meta.dirname, "../data"); // D:\\Cursos\\Codeable Curso\\node\\handlers unir ../data
const MESSAGE_FILE = path.join(DATA_DIR, "message.json");

export async function postContact(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    /* res, message, status = 500 */
    throw new HttpError("Faltan completar Datos", 400);
  }

  let messages = [
    // {nombre: "", correo: "", message: "", timestamp: ""},
    // {nombre: "", correo: "", message: "", timestamp: ""},
    // {nombre: "", correo: "", message: "", timestamp: ""},
  ];

  try {
    // Obtener Los datos del archivo
    const data = await readFile(MESSAGE_FILE, "utf-8");
    messages = JSON.parse(data);
  } catch (error) {
    const status = 500;
    const message = "Error interno del servidor";

    if (error.code === "ENOENT") {
      await mkdir(DATA_DIR, { recursive: true });
      // 1. Si "/data/" no existe → LO CREA
      // 2. Si "/data/message.json" no existe → LO CREA
      // 3. Si "/data/message.json" ya existe → NO HACE NADA (no da error)
    } else {
      return sendErrorHtml(res, "Error del servidor", 500);
    }
  }

  // Guardamos el siguiente contacto registrado
  messages.push({
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  });

  // Escribimos en el archivo
  await writeFile(MESSAGE_FILE, JSON.stringify(messages));

  const content = `
    <h1>Mensaje Recibido</h1>
    <p>Gracias <strong>${name}</strong> (${email}). Hemos recibido tu mensaje.</p>
    <a href="/">Volver al inicio</a>
  `;

  const html = getLayout("Confirmación", content);
  sendHtml(res, html);
}
