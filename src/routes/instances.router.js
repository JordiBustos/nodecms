const { Router } = require("express");

const {
  getInstances,
  getInstanceByName,
  createInstance,
  updateInstanceByName,
  deleteInstanceByName,
} = require("../controllers/instances.controller");

const {
  getInstancesValidation,
  instancePostValidation,
  getInstanceByNameValidation,
  nameInBodyValidation,
} = require("../middlewares/instances.validator");

const instancesRouter = Router();

instancesRouter.get("/:tableName", getInstancesValidation(), getInstances);
instancesRouter.post("/:tableName", instancePostValidation(), createInstance);
instancesRouter.get(
  "/:tableName/:name",
  getInstanceByNameValidation(),
  getInstanceByName
);
instancesRouter.put(
  "/:tableName",
  nameInBodyValidation(),
  updateInstanceByName
);
instancesRouter.delete(
  "/:tableName",
  nameInBodyValidation(),
  deleteInstanceByName
);

module.exports = instancesRouter;
