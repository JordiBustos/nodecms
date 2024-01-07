const generateResponse = (res, err = null, code, msg, value = null) => {
  const response = {};
  if (err) response["error"] = err;
  if (value) response["value"] = value;

  return res.status(code).send({
    msg: msg,
  });
};

module.exports = {
  generateResponse,
};
