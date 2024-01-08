const { Router } = require("express");

const {
  getEntities,
  getEntityByName,
  deleteEntityByName,
  updateEntityByName,
  createEntity,
} = require("../controllers/entities.controller");

const {
  entityPostValidation,
  paramNameValidation,
} = require("../middlewares/entities.validator");

const entitiesRouter = Router();

entitiesRouter.get("/", getEntities);
entitiesRouter.post("/", entityPostValidation(), createEntity);
entitiesRouter.get("/:name", paramNameValidation(), getEntityByName);
entitiesRouter.put("/:name", paramNameValidation(), updateEntityByName);
entitiesRouter.delete("/:name", paramNameValidation(), deleteEntityByName);

module.exports = entitiesRouter;
