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
  getEntityByNameValidation,
  validateParamNotEmpty,
} = require("../middlewares/entities.validator");

const entitiesRouter = Router();

entitiesRouter.get("/", getEntities);
entitiesRouter.post("/", entityPostValidation(), createEntity);
entitiesRouter.get("/:name", getEntityByNameValidation(), getEntityByName);
entitiesRouter.put("/:name", validateParamNotEmpty(), updateEntityByName);
entitiesRouter.delete("/:name", validateParamNotEmpty(), deleteEntityByName);

module.exports = entitiesRouter;
