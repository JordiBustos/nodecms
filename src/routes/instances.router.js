const { Router } = require("express");

const {
  getInstances,
  getInstanceByName,
  createInstance,
  updateInstanceByName,
  deleteInstanceByName,
} = require("../controllers/instances.controller");

const instancesRouter = Router();

instancesRouter.get("/:tableName", getInstances);
instancesRouter.post("/:tableName", createInstance);
instancesRouter.get("/:tableName/:name", getInstanceByName);
instancesRouter.put("/:name", updateInstanceByName);
instancesRouter.delete("/:name", deleteInstanceByName);

module.exports = instancesRouter;
