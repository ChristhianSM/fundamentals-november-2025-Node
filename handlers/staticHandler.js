import { readFile } from "node:fs/promises";
import path from "node:path";
import mime from "mime-types";

const PUBLIC_DIR = path.resolve("public");

export async function staticHandler(req, res, pathname) {
  const filePath = path.join(PUBLIC_DIR, pathname);
  const extname = path.extname(pathname).toLowerCase();
  const mimeType = mime.lookup(extname);

  if (mimeType) {
    try {
      const data = await readFile(filePath);
      console.log(data);
      res.writeHead(200, { "Content-Type": mimeType });
      return res.end(data);
    } catch (error) {
      let status = 500;
      if (error.code === "ENOENT" || error.code === "EISDIR") {
        status = 400;
      } else if (error.code === "EACCES") {
        status = 403;
      }
      res.writeHead(status);
      return res.end();
    }
  }
}
