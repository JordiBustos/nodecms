const { body, param } = require("express-validator");

const entityPostValidation = () => [
  body("name").notEmpty().trim(),
  body("fields_names").isArray().notEmpty(),
  body("fields_types").isArray().notEmpty(),
];

const paramNameValidation = () => [param("name").trim().notEmpty()];

module.exports = {
  entityPostValidation,
  paramNameValidation,
};
