const { Router } = require("express");

const {
  getInstances,
  getInstanceByName,
  createInstance,
  deleteInstanceByName,
  updateInstanceByName,
} = require("../controllers/entities.controller");
/*
const {
  InstancesPostValidation,
  getInstancesByNameValidation,
  validateParamNotEmpty,
} = require("../middlewares/entities.validator");
*/
const instancesRouter = Router();

entitiesRouter.get("/", getEntities);
entitiesRouter.post("/", InstancesPostValidation(), createInstances);
entitiesRouter.get("/:name", getInstancesByNameValidation(), getInstancesByName);
entitiesRouter.put("/:name", validateParamNotEmpty(), updateInstancesByName);
entitiesRouter.delete("/:name", validateParamNotEmpty(), deleteInstancesByName);

module.exports = instancesRouter;
