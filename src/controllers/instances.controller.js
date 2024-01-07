const Instances = require("../models/instances.model");
const db = require("../db");

const getInstances = async (req, res) => {
  const tableName = req.body.tableName;
  try {
    const rowsOfTable = await db.model(tableName).findAll();
    res.status(200).send({
      msg: `"${tableName}" query successful`,
      rows: rowsOfTable,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong",
      err: err,
    });
  }
};

const createInstance = async (req, res) => {
  const tableName = req.body.tableName;
  try {
    const newRow = await db.model(tableName).create(req.body);
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

const getInstanceByName = async (req, res) => {};

/*
  TODO  Dinamically add fields into the "name" table
*/
const updateInstanceByName = async (req, res) => {};

const deleteInstanceByName = async (req, res) => {};

module.exports = {
  createInstance,
  getInstances,
  getInstanceByName,
  updateIstanceByName,
  deleteIstanceByName,
};
