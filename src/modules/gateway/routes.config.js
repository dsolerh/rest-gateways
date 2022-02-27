const router = require("express").Router();
const GatewayController = require("./controllers/gateway.controller");

console.log("Initializing routes: Gateway");
router.post("/gateway", GatewayController.create);
router.get("/gateway", GatewayController.list);
router.get("/gateway/:id", GatewayController.getById);

module.exports = router;
