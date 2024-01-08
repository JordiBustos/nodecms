const Entities = require("../models/entities.model");
const generateAttributtes = require("../utils/dtypes");
const { generateResponse } = require("../utils/generateResponse");
const saveModelFile = require("../utils/saveModelFile");
const db = require("../db");

const getEntities = async (req, res) => {
  try {
    const entities = await Entities.findAll();
    if (entities.length === 0) {
      return generateResponse(res, null, 404, "Table is empty");
    }
    return generateResponse(res, null, 200, "Entities retrieved successfully", entities);
  } catch (err) {
    return generateResponse(res, err, 500, "Something went wrong");
  }
};

const createEntity = async (req, res) => {
  try {
    const { name, fields_names, fields_types } = req.body;
    const entity = await Entities.create(req.body);
    const attributes = generateAttributtes(fields_names, fields_types);

    if (attributes === null) {
      return generateResponse(
        res,
        "Invalid datatypes provided in fields_names and fields_types",
        400,
        "fields_names and fields_type should be an array of strings"
      );
    }

    if (!db.models[name]) {
      const model = db.define(name, attributes, { freezeTableName: true });
      await db.transaction(async (transaction) => {
        await model.sync({ alter: true, transaction });
        const modelJSON = JSON.stringify({ name, attributes });
        await saveModelFile(`${name}.json`, modelJSON, transaction);
      });
    }

    return generateResponse(
      res,
      null,
      200,
      "Entity created successfully",
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
