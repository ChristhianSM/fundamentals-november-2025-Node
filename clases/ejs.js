import express from "express";
import expressLayouts from "express-ejs-layouts";

const PORT = 3001;

const app = express();

// Parsear datos de un formulario
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static("public"));

// Configuración de plantillas EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware para trabajar con plantillas EJS
app.use(expressLayouts);
app.set("layout", "layout");


// Rutas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});