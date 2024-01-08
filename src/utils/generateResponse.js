const generateResponse = (res, err = null, code, msg, value = null) => {
  const response = {};
  if (err) response["error"] = err;
  if (value !== null) response["value"] = value;

  return res.status(code).send({
    msg: msg,
    ...response,
  });
};

module.exports = {
  generateResponse,
};
