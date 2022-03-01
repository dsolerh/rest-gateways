const { ValidationError, CastError } = require("mongoose").Error;

module.exports = function (error, res) {
  console.error(error);
  if (error instanceof ValidationError) {
    return res.status(400).json(error);
  }
  if (error instanceof CastError) {
    return res.status(400).json(error);
  }
  return res.status(500).send("Internal Server Error");
};
