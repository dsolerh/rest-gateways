const app = require("./server");

// start the listening on PORT
const PORT = process.env.APP_PORT || 5000;

// setup the docs
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(PORT, () => {
  console.log("App is Listening on Port: ", PORT);
});
