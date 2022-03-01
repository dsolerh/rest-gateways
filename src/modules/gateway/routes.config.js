const router = require("express").Router();
const { GatewayController } = require("./controllers/gateway.controller");

module.exports = (mongooseInstance) => {
  console.log("Initializing routes: Gateway");

  const controller = new GatewayController(mongooseInstance);

  // basic gateway CRUD
  router.post("/gateway", (req, res) => controller.createGateway(req, res));
  router.get("/gateway", (req, res) => controller.listGateways(req, res));
  router.get("/gateway/:id", (req, res) => controller.getById(req, res));
  router.patch("/gateway/:id", (req, res) =>
    controller.updateGateway(req, res)
  );
  router.delete("/gateway/:id", (req, res) =>
    controller.deleteGateway(req, res)
  );

  // devices management
  router.post("/gateway/:id/add-device", (req, res) =>
    controller.addDevice(req, res)
  );
  router.delete("/gateway/:id/remove-device/:deviceId", (req, res) =>
    controller.removeDevice(req, res)
  );

  return router;
};
