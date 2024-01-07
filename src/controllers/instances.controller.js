// const Instances = require("../models/instances.model");
const db = require("../db");

const getInstances = async (req, res) => {
  try {
    const dynamicModel = db.models[req.params.tableName];
    const result = await dynamicModel.findAll();
    if (result.length === 0) {
      res.send({ msg: "Table is empty" });
    } else {
      res.send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Something went wrong",
      err: err,
    });
  }
};

const createInstance = async (req, res) => {
  const tableName = req.params.tableName;
  if (tableName === "Entities")
    res.status(400).send({
      msg: "Entities cannot be created through this endpoint",
      err: "Invalid endpoint",
    });
  try {
    const dynamicModel = db.model(tableName);
    const newRow = await dynamicModel.create(req.body);
    await db.sync({ alter: true });
    res.status(200).send({
      msg: "New instance created succesfully",
      instance: newRow,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong",
      err: err,
    });
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
      return res.status(404).send({
        msg: "Entity not found",
        err: "Entity does not exist in entities table",
      });
    }
    res.send(row);
  } catch (err) {
    res.status(500).send({
      msg: "Instance not found",
      err: err,
    });
  }
};

/*
  TODO  Dinamically add fields into the "name" table
*/
const updateInstanceByName = async (req, res) => {};

const deleteInstanceByName = async (req, res) => {};

module.exports = {
  createInstance,
  getInstances,
  getInstanceByName,
  updateInstanceByName,
  deleteInstanceByName,
};
