const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// general configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// Routes
const setGatewayRouter = require("./modules/gateway/routes.config");

module.exports = (mongooseInstance) => {
  // Set the Routes
  app.use("/api", setGatewayRouter(mongooseInstance));
  return app;
};
