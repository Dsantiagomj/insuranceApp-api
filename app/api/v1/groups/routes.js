import { Router } from "express";

import * as controller from "./controller.js";
import { router as insuranceCompaniesRouter } from "../insuranceCompanies/routes.js";
import { router as policiesRouter } from "../policies/routes.js";
import { router as clientsRouter } from "../clients/routes.js";

export const router = Router();
/*
 * /api/groups/     POST    - CREATE
 * /api/groups/     GET     - READ ALL
 * /api/groups/:id  GET     - READ ONE
 * /api/groups/:id  PUT     - UPDATE
 * /api/groups/:id  DELETE  - DELETE
 */

router.route("/").post(controller.create).get(controller.getAll);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);

router.use("/:groupId/insuranceCompanies", insuranceCompaniesRouter);
router.use("/:groupId/policies", policiesRouter);
router.use("/:groupId/clients", clientsRouter);
