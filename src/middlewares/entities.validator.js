const { body, param } = require("express-validator");

const entityPostValidation = () => {
  return [
    body("name").notEmpty().trim(),
    body("fields_names").isArray().notEmpty(),
    body("fields_types").isArray().notEmpty(),
  ];
};

const getEntityByNameValidation = () => {
  return [param("name").trim().notEmpty()];
};

const deleteEntityByNameValidation = () => {
  return [param("name").trim().notEmpty()];
};

module.exports = {
  entityPostValidation,
  getEntityByNameValidation,
  deleteEntityByNameValidation
};
