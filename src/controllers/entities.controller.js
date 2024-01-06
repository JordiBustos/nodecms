const Entities = require("../models/entities.models");
const generateAttributtes = require("../utils/dtypes");
const db = require("../db");

const get_entities = async (req, res) => {
  const entities = await Entities.findAll();
  res.send(entities);
};

const create_entity = async (req, res) => {
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
    const _ = db.define(req.body.name, attr, { freezeTableName: true });
    db.sync();
    res.status(200).send({
      msg: "Entity created succesfully",
      entity: entity,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong while creating an entity",
      err: err,
    });
  }
};

const get_entity_by_name = async (req, res) => {
  try {
    const entity = await Entities.findOne({
      where: {
        name: req.params.name,
      },
    });
    if (!entity)
      res.status(404).send({
        msg: "Entity not found",
        err: "Entity does not exists in entities table",
      });

    res.send(entity);
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong while searching the entity",
      err: err,
    });
  }
};

const update_entity_by_name = (req, res) => {};

const delete_entity_by_name = async (req, res) => {
  try {
    const tableName = req.params.name;
    listAllTables();
    // Check if the table exists in the database
    const tableExistsQuery = `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${tableName}')`;
    const [result] = await db.query(tableExistsQuery);

    if (result[0].exists) {
      // Table exists, delete entity and drop the table
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
      // Table does not exist
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

const listAllTables = async () => {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `;

    const [result] = await db.query(query);

    if (result.length > 0) {
      const tables = result.map((row) => row.table_name);
      console.log("List of tables:", tables);
    } else {
      console.log("No tables found in the database.");
    }
  } catch (error) {
    console.error("Error listing tables:", error);
  }
};

module.exports = {
  create_entity,
  get_entities,
  get_entity_by_name,
  update_entity_by_name,
  delete_entity_by_name,
};
