import express from "express";
import { getHealth, getTime, postContact } from "./handlers/apiHandlers.js";
import { getHome, getNewContact } from "./handlers/viewHandlers.js";
import { globalErrorHandler } from "./handlers/errorsHandlers.js";

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Metodo GET
// Rutas de Api
app.get("/api/health", getHealth);
app.get("/api/time", getTime);

// Rutas de archivos HTML
app.get("/", getHome);
app.get("/contact", getNewContact);

// Metodo POST
app.post("/contact", postContact);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
