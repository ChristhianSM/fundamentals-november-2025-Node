import { Router } from "express";
import { getHealth, getTime } from "../handlers/apiHandlers.js";

// Rutas de Api
const apiRouter = Router();
apiRouter.get("/health", getHealth);
apiRouter.get("/time", getTime);

export default apiRouter;
