import path from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { parseUrlEncoded } from "../utils/parseBody.js";
import { sendHtml, sendJson } from "../utils/response.js";
import { getLayout } from "../utils/layout.js";

export async function getHealth(req, res) {
  const data = { status: "ok" };
  sendJson(res, data);
}

export async function getTime(req, res) {
  const data = { time: new Date().toISOString() };
  sendJson(res, data);
}

const DATA_DIR = path.join(import.meta.dirname, "../data"); // D:\\Cursos\\Codeable Curso\\node\\handlers unir ../data
const MESSAGE_FILE = path.join(DATA_DIR, "message.json");

export async function postContact(req, res) {
  console.log({ DATA_DIR, MESSAGE_FILE });
  let body;
  try {
    body = await parseUrlEncoded(req);
  } catch {
    res.writeHead(500);
    return res.end();
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    res.writeHead(400);
    return res.end();
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
    console.log(error);
    if (error.code === "ENOENT") {
      await mkdir(DATA_DIR, { recursive: true });
      // 1. Si "/data/" no existe → LO CREA
      // 2. Si "/data/message.json" no existe → LO CREA
      // 3. Si "/data/message.json" ya existe → NO HACE NADA (no da error)
    } else {
      res.writeHead(500);
      return res.end();
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
