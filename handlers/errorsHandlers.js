export function globalErrorHandler(error, req, res, next) {
  console.log("Error en el Router ", {
    message: error.message,
    status: error.status,
    name: error.name,
  });

  const pathname = req.path;

  const status = error.status || 500;
  const message = status === 500 ? "Error interno del servidor" : error.message;

  if (pathname.startsWith("/api")) {
    const jsonError = {
      status,
      error: message,
    };
    res.status(status).json(jsonError);
  } else {
    res.status(status).send(`<h1>Error ${status}</h1><p>${message}</p>`);
  }
}
