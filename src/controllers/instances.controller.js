// const Instances = require("../models/instances.model");
const db = require("../db");
const { generateResponse } = require("../utils/generateResponse");

const getInstances = async (req, res) => {
  try {
    const dynamicModel = db.models[req.params.tableName];
    const result = await dynamicModel.findAll();
    if (result.length === 0)
      return generateResponse(res, null, 404, "Table is empty", []);
    res.status(200).send(result);
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

const createInstance = async (req, res) => {
  const tableName = req.params.tableName;
  if (tableName === "Entities")
    return generateResponse(
      res,
      "Invalid endpoint",
      400,
      "Entities cannot be created through this endpoint"
    );
  try {
    const dynamicModel = db.model(tableName);
    const newRow = await dynamicModel.create(req.body);
    await db.sync({ alter: true });
    return generateResponse(
      res,
      null,
      200,
      "New instance created succesfully",
      newRow
    );
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

const getInstanceByName = async (req, res) => {
  const tableName = req.params.tableName;
  try {
    const dynamicModel = db.model(tableName);
    const row = await dynamicModel.findOne({
      where: {
        name: req.params.name,
      },
    });
    if (!row) {
      return generateResponse(
        res,
        "Entity does not exist in entities table",
        404,
        "Entity not found"
      );
    }
    res.status(200).send(row);
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

/*
  TODO  Dinamically add fields into the "name" table
*/
const updateInstanceByName = async (req, res) => {
  const tableName = req.params.tableName;
  const instanceName = req.body.name;
  try {
    const dynamicModel = db.models[tableName];
    const updatedInstance = await dynamicModel.update(
      {
        name: req.body.name,
        ...req.body,
      },
      {
        where: {
          name: instanceName,
        },
      }
    );

    if (!updatedInstance)
      return generateResponse(
        res,
        "The instance was not found in the database",
        404,
        "Instance not found"
      );
    res.status(200).send({
      msg: "Instance updated successfuly",
    });
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

const deleteInstanceByName = async (req, res) => {
  const tableName = req.params.tableName;
  const name = req.body.name;

  if (!name)
    return generateResponse(res, "The name is required", 400, "Bad request");

  try {
    const deletedInstance = await db.models[tableName].destroy({
      where: {
        name: name,
      },
    });

    if (deletedInstance === 0)
      return generateResponse(
        res,
        "The instance was not found in the database",
        404,
        "Instance not found"
      );

    return generateResponse(
      res,
      null,
      200,
      "Instance deleted successfuly",
      deletedInstance
    );
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

module.exports = {
  createInstance,
  getInstances,
  getInstanceByName,
  updateInstanceByName,
  deleteInstanceByName,
};
