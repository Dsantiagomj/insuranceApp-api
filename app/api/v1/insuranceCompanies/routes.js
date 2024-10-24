import { Router } from "express";

import * as controller from "./controller.js";

export const router = Router({ mergeParams: true });
/*
 * /api/insuranceCompanies/     POST    - CREATE
 * /api/insuranceCompanies/     GET     - READ ALL
 * /api/insuranceCompanies/:id  GET     - READ ONE
 * /api/insuranceCompanies/:id  PUT     - UPDATE
 * /api/insuranceCompanies/:id  DELETE  - DELETE
 */

router.route("/").post(controller.create).get(controller.getAll);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);
