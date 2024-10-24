import { Router } from "express";
import { router as clients } from "./clients/routes.js";
import { router as groups } from "./groups/routes.js";
import { router as insuranceCompanies } from "./insuranceCompanies/routes.js";
import { router as policies } from "./policies/routes.js";
import { router as users } from "./users/routes.js";

export const router = Router();

router.use("/clients", clients);
router.use("/groups", groups);
router.use("/insuranceCompanies", insuranceCompanies);
router.use("/policies", policies);
router.use("/users", users);
