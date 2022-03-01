const router = require("express").Router();
const GatewayController = require("./controllers/gateway.controller");

console.log("Initializing routes: Gateway");

router.post("/gateway", GatewayController.createGateway);
router.get("/gateway", GatewayController.listGateways);
router.get("/gateway/:id", GatewayController.getById);
router.patch("/gateway/:id", GatewayController.updateGateway);
router.delete("/gateway/:id", GatewayController.deleteGateway);
router.post("/gateway/:id/add-device", GatewayController.addDevice);
router.delete(
  "/gateway/:id/remove-device/:deviceId",
  GatewayController.removeDevice
);

module.exports = router;
