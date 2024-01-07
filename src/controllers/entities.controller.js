const Entities = require("../models/entities.model");
const generateAttributtes = require("../utils/dtypes");
const db = require("../db");

const getEntities = async (req, res) => {
  try {
    const entities = await Entities.findAll();
    if (entities.length === 0) {
      res.send({ msg: "Table is empty" });
    } else {
      res.send(entities);
    }
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong while fetching all entities",
      err: err,
    });
  }
};

const createEntity = async (req, res) => {
  try {
    const entity = await Entities.create(req.body);
    const attr = generateAttributtes(
      req.body.fields_names,
      req.body.fields_types
    );
    if (attr === null)
      res.status(400).send({
        msg: "fields_names and fields_type should be an array of strings",
        err: "Invalid datatypes provided in fields_names and fields_types",
      });
    const model = db.define(req.body.name, attr, { freezeTableName: true });
    await db.sync({alter: true});
    res.status(200).send({
      msg: "Entity created succesfully",
      entity: entity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Something went wrong while creating an entity",
      err: err,
    });
  }
};

const getEntityByName = async (req, res) => {
  try {
    const entity = await Entities.findOne({
      where: {
        name: req.params.name,
      },
    });

    if (!entity) {
      return res.status(404).send({
        msg: "Entity not found",
        err: "Entity does not exist in entities table",
      });
    }

    res.send(entity);
  } catch (err) {
    return res.status(500).send({
      msg: "Something went wrong while searching for the entity",
      err: err,
    });
  }
};

/*
  TODO  Dinamically add fields into the "name" table
*/
const updateEntityByName = async (req, res) => {
  const updateData = req.body;
  const name = req.params.name;

  try {
    const [rowsUpdated, [updatedEntity]] = await Entities.update(updateData, {
      where: {
        name: name,
      },
      returning: true,
    });
    if (rowsUpdated === 0) {
      return res.status(404).send({
        msg: "Entity not found",
        err: "No matching entity found for the given name",
      });
    }
    res.status(200).send(updatedEntity);
  } catch (err) {
    res.status(500).send({
      msg: "Error updating the entity",
      err: err,
    });
  }
};

const deleteEntityByName = async (req, res) => {
  try {
    const tableName = req.params.name;
    const tableExistsQuery = `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${tableName}')`;
    const [result] = await db.query(tableExistsQuery);

    if (result[0].exists) {
      await Entities.destroy({
        where: {
          name: tableName,
        },
      });

      await db.query(`DROP TABLE IF EXISTS "${tableName}"`);

      res.status(200).send({
        msg: "Entity deleted successfully",
      });
    } else {
      res.status(404).send({
        msg: "The entity does not exist",
        err: "The entity was not found in the database",
      });
    }
  } catch (error) {
    console.error("Error deleting entity:", error);
    res.status(500).send({
      msg: "Something went wrong while deleting the entity",
      err: "Internal server error while deleting the entity",
    });
  }
};

module.exports = {
  createEntity,
  getEntities,
  getEntityByName,
  updateEntityByName,
  deleteEntityByName,
};
