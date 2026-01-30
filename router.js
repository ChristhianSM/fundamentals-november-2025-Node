import { getHealth, getTime, postContact } from "./handlers/apiHandlers.js";
import { staticHandler } from "./handlers/staticHandler.js";
import { getHome, getNewContact } from "./handlers/viewHandlers.js";
import { sendErrorHtml, sendErrorJson } from "./utils/response.js";

export async function router(req, res) {
  // 1. Analizar la URL (req.url)
  // const pathname = req.url;
  // const method = req.method;
  const { url: pathname, method } = req;

  try {
    // Metodo: POST
    if (pathname === "/contact" && method === "POST") {
      return await postContact(req, res);
    }

    // Metodo: GET
    // 2. Crear las reglas (if) para cada ruta:
    //    - "/api/health" -> return JSON
    if (pathname === "/api/health") {
      return await getHealth(req, res);
    }
    //    - "/api/time"   -> return JSON
    if (pathname === "/api/time") {
      return await getTime(req, res);
    }
    //    - "/"           -> return HTML
    if (pathname === "/") {
      // HTML que debes devolver en la raíz "/"
      return await getHome(req, res);
    }

    if (pathname === "/contact" && method === "GET") {
      // HTML que debes devolver cuando el usuario visita "/contact"
      return await getNewContact(req, res);
    }

    // Archivos estaticos
    await staticHandler(req, res, pathname);
  } catch (error) {
    console.log("Error en el Router ", {
      message: error.message,
      status: error.status,
      name: error.name,
    });

    const status = error.status || 500;
    const message =
      status === 500 ? "Error interno del servidor" : error.message;

    if (pathname.startsWith("/api")) {
      sendErrorJson(res, message, status);
    } else {
      sendErrorHtml(res, message, status);
    }
  }
}
