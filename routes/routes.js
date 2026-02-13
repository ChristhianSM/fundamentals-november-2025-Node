import { Router } from "express";
import { getHome, getNewContact } from "../handlers/viewHandlers.js";
import { postContact } from "../handlers/apiHandlers.js";

const router = Router();

// Metodo GET


// Rutas de archivos HTML
router.get("/", getHome);
router.get("/contact", getNewContact);

// Metodo POST
router.post("/contact", postContact);

export default router;