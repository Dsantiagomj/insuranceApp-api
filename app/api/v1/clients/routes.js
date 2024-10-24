import { Router } from "express";

import * as controller from "./controller.js";

export const router = Router({ mergeParams: true });
/*
 * /api/clients/     POST    - CREATE
 * /api/clients/     GET     - READ ALL
 * /api/clients/:id  GET     - READ ONE
 * /api/clients/:id  PUT     - UPDATE
 * /api/clients/:id  DELETE  - DELETE
 */

router.route("/").post(controller.create).get(controller.getAll);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);
