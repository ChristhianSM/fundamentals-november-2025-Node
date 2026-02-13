import express from "express";
import { globalErrorHandler } from "./handlers/errorsHandlers.js";
import apiRouter from "./routes/api.js";
import router from "./routes/routes.js";

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", router);
app.use("/api", apiRouter);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
