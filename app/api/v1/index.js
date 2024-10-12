import { Router } from "express";
import { router as clients } from "./clients/routes.js";

export const router = Router();

router.use("/clients", clients);
