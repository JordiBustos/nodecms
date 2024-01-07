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
  deleteEntityByNameValidation,
} = require("../middlewares/entities.validator");

const entitiesRouter = Router();

entitiesRouter.get("/", getEntities);

entitiesRouter.post("/", entityPostValidation(), createEntity);

entitiesRouter.get("/:name", getEntityByNameValidation(), getEntityByName);

entitiesRouter.put("/:name", updateEntityByName);

entitiesRouter.delete(
  "/:name",
  deleteEntityByNameValidation(),
  deleteEntityByName
);

module.exports = entitiesRouter;
