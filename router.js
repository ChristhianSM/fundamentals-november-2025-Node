import { getHealth, getTime, postContact } from "./handlers/apiHandlers.js";
import { staticHandler } from "./handlers/staticHandler.js";
import { getHome, getNewContact } from "./handlers/viewHandlers.js";

export async function router(req, res) {
  // 1. Analizar la URL (req.url)
  // const pathname = req.url;
  // const method = req.method;
  const { url: pathname, method } = req;

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
}
