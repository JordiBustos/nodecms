const { DataTypes } = require("sequelize");

const generateAttributtes = (fieldsNames, fieldsTypes) => {
  // TODO ADD ALL TYPES
  const strToDtype = {
    VARCHAR: DataTypes.STRING.types.postgres,
    TEXT: DataTypes.TEXT.types.postgres,
    DATE: DataTypes.DATE.types.postgres,
    INT: DataTypes.INTEGER.types.postgres,
  };

  if (fieldsNames.some((name) => typeof name !== "string")) return null;
  if (fieldsTypes.some((name) => typeof name !== "string")) return null;

  const attributes = {};

  fieldsNames.forEach((fieldName, i) => {
    const fieldType = fieldsTypes[i];
    const dataType = strToDtype[fieldType];

    if (dataType) {
      attributes[fieldName] = { type: dataType };
    } else {
      console.error(`Invalid data type: ${fieldType} for field ${fieldName}`);
    }
  });

  return attributes;
};

module.exports = generateAttributtes;
