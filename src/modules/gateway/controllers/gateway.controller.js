const GatewayService = require("../services/gateway.service");
const errorHandler = require("../../common/error-handling");

console.log("Initializing controller: Gateway");

module.exports = {
  createGateway,
  listGateways,
  getById,
  updateGateway,
  deleteGateway,
  removeDevice,
  addDevice,
};

async function createGateway(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to create a gateway'

  /* #swagger.parameters['newGateway'] = {
      in: 'body',
      description: 'Gateway information.',
      required: true,
      schema: { $ref: "#/definitions/AddGateway" }
  } */

  try {
    const gateway = await GatewayService.createGateway(req.body);
    return res.status(200).send(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function listGateways(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to list all gateways'

  try {
    const gateways = await GatewayService.findByPages(req.query);
    return res.status(200).send(gateways);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getById(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to show an specific gateway by it's id'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }
  try {
    const gateway = await GatewayService.findById(req.params.id);
    if (!gateway) {
      return res.status(404).send("Not Found");
    }
    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Gateway" },
        description: 'Gateway found.' 
    } */
    return res.status(200).json(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function updateGateway(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to update an specific gateway by it's id'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }

  /* #swagger.parameters['updatedGateway'] = {
      in: 'body',
      description: 'Gateway field to be updated information.',
      required: true,
      schema: { $ref: "#/definitions/UpdateGateway" }
  } */

  try {
    const gateway = await GatewayService.updateGateway(req.params.id, req.body);
    if (!gateway) {
      return res.status(404).send("Not Found");
    }
    /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Gateway" },
          description: 'Gateway found.' 
      } */
    return res.status(200).json(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function deleteGateway(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to delete an specific gateway by it's id'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }

  try {
    const gateway = await GatewayService.deleteGateway(req.params.id);
    if (!gateway) {
      return res.status(404).send("Not Found");
    }
    return res.status(204).json(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function addDevice(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to add a device to a gateway'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }

  /* #swagger.parameters['newDevice'] = {
      in: 'body',
      description: 'Device to be added.',
      required: true,
      schema: { $ref: "#/definitions/AddDevice" }
  } */
  try {
    const gateway = await GatewayService.addDevice(req.params.id, req.body);
    if (!gateway) {
      return res.status(404).send("Not Found");
    }
    return res.status(201).json(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function removeDevice(req, res) {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to remove a device from a gateway'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }
  // #swagger.parameters['deviceId'] = { description: 'ID of the device' }

  try {
    const gateway = await GatewayService.removeDevice(
      req.params.id,
      req.params.deviceId
    );
    if (!gateway) {
      return res.status(404).send("Not Found");
    }
    return res.status(204).json(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
}
