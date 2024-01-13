const { body, param } = require("express-validator");

const getInstancesValidation = () => [param("tableName").trim().notEmpty()];

const instancePostValidation = () => [
  body("name").trim().notEmpty(),
  param("tableName").trim().notEmpty(),
];

const getInstanceByNameValidation = () => [
  param("name").trim().notEmpty(),
  param("tableName").trim().notEmpty(),
];

const validateParamNotEmpty = () => [param("name").trim().notEmpty()];

module.exports = {
  getInstancesValidation,
  instancePostValidation,
  getInstanceByNameValidation,
  validateParamNotEmpty,
};
