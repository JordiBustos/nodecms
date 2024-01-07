const Entities = require("../models/entities.model");
const generateAttributtes = require("../utils/dtypes");
const { generateResponse } = require("../utils/generateResponse");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const getEntities = async (req, res) => {
  try {
    const entities = await Entities.findAll();
    if (entities.length === 0)
      return generateResponse(res, null, 404, "Table is empty");
    res.status(200).send(entities);
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
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
      return generateResponse(
        res,
        "Invalid datatypes provided in fields_names and fields_types",
        400,
        "fields_names and fields_type should be an array of strings"
      );

    const configDir = path.join(__dirname, "../config");

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir);
    }

    if (!db.models[req.body.name]) {
      const model = db.define(req.body.name, attr, { freezeTableName: true });
      await model.sync({ alter: true });

      const modelJSON = JSON.stringify({
        name: req.body.name,
        attr: attr,
      });
      try {
        fs.writeFileSync(
          path.join(configDir, `${req.body.name}.json`),
          modelJSON
        );
      } catch (err) {
        return generateResponse(
          res,
          err,
          500,
          "Something went wrong saving the model"
        );
      }
    }
    return generateResponse(
      res,
      null,
      200,
      "Entity created succesfully",
      entity
    );
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

const getEntityByName = async (req, res) => {
  try {
    const entity = await Entities.findOne({
      where: {
        name: req.params.name,
      },
    });

    if (!entity)
      return generateResponse(
        res,
        "Entity does not exist in entities table",
        404,
        "Entity not found"
      );
    return generateResponse(
      res,
      null,
      200,
      "Response generated successfuly",
      entity
    );
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
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
      return generateResponse(
        res,
        "No matching entity found for the given name",
        404,
        "Entity not found"
      );
    }
    return generateResponse(
      res,
      null,
      200,
      "Entity updated successfuly",
      updatedEntity
    );
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
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

      return generateResponse(res, null, 200, "Entity deleted successfully");
    }
    return generateResponse(
      res,
      "The entity was not found in the database",
      404,
      "The entity does not exist"
    );
  } catch (error) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

module.exports = {
  createEntity,
  getEntities,
  getEntityByName,
  updateEntityByName,
  deleteEntityByName,
};
