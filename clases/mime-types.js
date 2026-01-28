import http from "node:http";
import mime from "mime-types";

const server = http.createServer(async (req, res) => {
  const pathname = req.url;
  // console.log("Content-Type:", mime.lookup(".html"));
  // console.log("Content-Type:", mime.lookup(".json"));
  // console.log("Content-Type:", mime.lookup(".css"));
  // console.log("Content-Type:", mime.lookup(".jpg"));
  // console.log("Content-Type:", mime.lookup(".jpg"));
  // console.log("Content-Type:", mime.lookup(".webm"));
  // console.log("Content-Type:", mime.lookup("undefind"));
  // console.log("Content-Type:", mime.lookup("index.html"));
  // console.log("Content-Type:", mime.lookup("styles.css"));
  // console.log("==================");
  // console.log(mime.contentType("text/html"));

  console.log("Content-Type:", mime.lookup(pathname));

  res.end("Chaoo");
});

server.listen(3001);
