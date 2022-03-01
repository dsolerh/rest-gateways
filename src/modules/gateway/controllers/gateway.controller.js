const GatewayService = require("../services/gateway.service");
const errorHandler = require("../../common/error-handling");

console.log("Initializing controller: Gateway");

exports.create = async (req, res) => {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to create a gateway'

  /* #swagger.parameters['newGateway'] = {
      in: 'body',
      description: 'Gateway information.',
      required: true,
      schema: { $ref: "#/definitions/AddGateway" }
  } */

  try {
    const gateway = await GatewayService.create(req.body);
    return res.status(200).send(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.list = async (req, res) => {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to list all gateways'

  try {
    const gateways = await GatewayService.findByPages(req.query);
    return res.status(200).send(gateways);
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getById = async (req, res) => {
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
};

exports.update = async (req, res) => {
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
    const gateway = await GatewayService.update(req.params.id, req.body);
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
};

exports.delete = async (req, res) => {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to delete an specific gateway by it's id'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }

  try {
    const gateway = await GatewayService.delete(req.params.id);
    if (!gateway) {
      return res.status(404).send("Not Found");
    }
    return res.status(204).json(gateway);
  } catch (error) {
    errorHandler(error, res);
  }
};
