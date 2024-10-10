import { Router } from "express";
import { router as clients } from "./clients/routes";

export const router = Router();

router.use("/clients", clients);
