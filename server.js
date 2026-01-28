import http from "node:http";
import { router } from "./router.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  router(req, res);
});

server.listen(PORT);
