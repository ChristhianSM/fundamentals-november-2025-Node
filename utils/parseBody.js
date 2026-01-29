export function parseUrlEncoded(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const params = new URLSearchParams(body);
        const result = Object.fromEntries(params);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (err) => reject(err));
  });
}
