const { DataTypes } = require("sequelize");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const Entities = db.define("Entities", {
  name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  description: { type: DataTypes.TEXT },
  fields_names: { type: DataTypes.ARRAY(DataTypes.STRING) },
  fields_types: { type: DataTypes.ARRAY(DataTypes.STRING) },
});

const configDir = path.join(__dirname, "../config");

fs.readdirSync(configDir).forEach(async (file) => {
  if (file.endsWith(".json")) {
    const modelPath = path.join(configDir, file);
    const modelDefinition = require(modelPath);
    const model = db.define(modelDefinition.name, modelDefinition.attributes, {
      freezeTableName: true,
    });

    await model.sync();
  }
});

db.sync();

module.exports = Entities;
