import { readFile } from "node:fs/promises";
import path from "node:path";
import mime from "mime-types";
import { HttpError } from "../utils/errors.js";

const PUBLIC_DIR = path.resolve("public"); // /node/public

export async function staticHandler(req, res, pathname) {
  const filePath = path.join(PUBLIC_DIR, pathname); // /node/public/node.jpg
  const extname = path.extname(pathname).toLowerCase(); //.jpg
  const mimeType = mime.lookup(extname) || "application/octet-stream";

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeType });
    return res.end(data);
  } catch (error) {
    let status = 500;
    let message = "Error Interno del servidor";
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      status = 404;
      message = "Recurso no encontrado";
    } else if (error.code === "EACCES" || error.code === "EPERM") {
      status = 403;
      message = "Permisos denegados";
    }

    throw new HttpError(message, status);
  }
}
