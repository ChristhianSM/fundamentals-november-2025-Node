import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { staticHandler } from "./handlers/staticHandler.js";
import { getHome } from "./handlers/viewHandlers.js";

export async function router(req, res) {
  // 1. Analizar la URL (req.url)
  const pathname = req.url;

  // 2. Crear las reglas (if) para cada ruta:
  //    - "/api/health" -> return JSON
  if (pathname === "/api/health") {
    getHealth(req, res);
  }
  //    - "/api/time"   -> return JSON
  if (pathname === "/api/time") {
    getTime(req, res);
  }
  //    - "/"           -> return HTML
  if (pathname === "/") {
    // HTML que debes devolver en la raíz "/"
    getHome(req, res);
  }

  // Archivos estaticos
  await staticHandler(req, res, pathname);
}
