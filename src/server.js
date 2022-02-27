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
const GatewayRouter = require("./modules/gateway/routes.config");

// Set the Routes
app.use("/api", GatewayRouter);

module.exports = app;
