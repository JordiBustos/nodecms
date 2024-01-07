const { DataTypes } = require("sequelize");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const Entities = db.define("Entities", {
  name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  description: { type: DataTypes.TEXT },
  fields_names: { type: DataTypes.ARRAY(DataTypes.STRING) },
  fields_types: { type: DataTypes.ARRAY(DataTypes.STRING) },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
});

const configDir = path.join(__dirname, "../config");

fs.readdirSync(configDir).forEach((file) => {
  if (file.endsWith(".json")) {
    const modelPath = path.join(configDir, file);
    const modelDefinition = require(modelPath);

    const model = db.define(modelDefinition.name, modelDefinition.attr, {
      freezeTableName: true,
    });

    model.sync();
  }
});

db.sync();

module.exports = Entities;
