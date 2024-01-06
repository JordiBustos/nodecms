const { DataTypes } = require("sequelize");
const db = require("../db");

const Entities = db.define("Entities", {
  name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  description: { type: DataTypes.TEXT },
  fields_names: { type: DataTypes.ARRAY(DataTypes.STRING) },
  fields_types: { type: DataTypes.ARRAY(DataTypes.STRING) },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
});

db.sync();

module.exports = Entities;
