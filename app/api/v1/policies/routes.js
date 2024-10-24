import { Router } from "express";

import * as controller from "./controller.js";

export const router = Router();
/*
 * /api/policies/     POST    - CREATE
 * /api/policies/     GET     - READ ALL
 * /api/policies/:id  GET     - READ ONE
 * /api/policies/:id  PUT     - UPDATE
 * /api/policies/:id  DELETE  - DELETE
 */

router.route("/").post(controller.create).get(controller.getAll);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);
