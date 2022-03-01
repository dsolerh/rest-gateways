const startApp = require("./server");
const getMongoose = require("./modules/common/db/mongoose.service");

// start the listening on PORT
const PORT = process.env.APP_PORT || 5000;

// setup the docs
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

async function startServer() {
  const mongoose = await getMongoose();
  const app = startApp(mongoose);

  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.listen(PORT, () => {
    console.log("App is Listening on Port: ", PORT);
  });
}
startServer();
