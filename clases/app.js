import express from "express";
import productsRouter from "./routes/products.js";

const PORT = 3000;

const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/products", productsRouter);
// localhost:3000/products/

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
