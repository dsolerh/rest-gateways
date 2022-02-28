const GatewayService = require("../services/gateway.service");
const { ValidationError } = require("mongoose").Error;

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
    console.error(error);
    if (error instanceof ValidationError) {
      return res.status(400).json(error);
    }
    return res.status(500).send("Internal Server Error");
  }
};

exports.list = async (req, res) => {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to list all gateways'

  const gateways = await GatewayService.findByPages(req.query);

  return res.status(200).send(gateways);
};

exports.getById = async (req, res) => {
  // #swagger.tags = ['Gateway']
  // #swagger.description = 'Endpoint to show an specific gateway by it's id'
  // #swagger.parameters['id'] = { description: 'ID of the gateway' }

  const gateway = await GatewayService.findById(req.params.id);
  if (!gateway) {
    return res.status(404).send("Not Found");
  }
  /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Gateway" },
        description: 'Gateway found.' 
    } */
  return res.status(200).json(gateway);
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
    console.error(error);
    if (error instanceof ValidationError) {
      return res.status(400).json(error);
    }
    return res.status(500).send("Internal Server Error");
  }
};
