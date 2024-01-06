const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  get_entities,
  get_entity_by_name,
  delete_entity_by_name,
  update_entity_by_name,
  create_entity,
} = require("../controllers/entities.controller");

const entitiesRouter = Router();

entitiesRouter.get("/", get_entities);

entitiesRouter.post(
  "/",
  body("name").notEmpty().trim(),
  body("fields_names").isArray().notEmpty(),
  body("fields_types").isArray().notEmpty(),
  create_entity
);

entitiesRouter.get(
  "/:name",
  param("name").trim().notEmpty(),
  get_entity_by_name
);

entitiesRouter.put("/:name", update_entity_by_name);

entitiesRouter.delete(
  "/:name",
  param("name").trim().notEmpty(),
  delete_entity_by_name
);

module.exports = entitiesRouter;
