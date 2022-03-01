const GatewayService = require('../services/gateway.service');
const errorHandler = require("../../common/error-handling");


class GatewayController {
  constructor(dbInstance) {
    console.log("Initializing controller: Gateway");
    this.service = new GatewayService(dbInstance);
  }

  async createGateway(req, res) {
    // #swagger.tags = ['Gateway']
    // #swagger.description = 'Endpoint to create a gateway'

    /* #swagger.parameters['newGateway'] = {
        in: 'body',
        description: 'Gateway information.',
        required: true,
        schema: { $ref: "#/definitions/AddGateway" }
    } */

    try {
      const gateway = await this.service.createGateway(req.body);
      return res.status(200).send(gateway);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async listGateways(req, res) {
    // #swagger.tags = ['Gateway']
    // #swagger.description = 'Endpoint to list all gateways'

    try {
      const gateways = await this.service.findByPages(req.query);
      return res.status(200).send(gateways);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getById(req, res) {
    // #swagger.tags = ['Gateway']
    // #swagger.description = 'Endpoint to show an specific gateway by it's id'
    // #swagger.parameters['id'] = { description: 'ID of the gateway' }
    try {
      const gateway = await this.service.findById(req.params.id);
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

  async updateGateway(req, res) {
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
      const gateway = await this.service.updateGateway(req.params.id, req.body);
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

  async deleteGateway(req, res) {
    // #swagger.auto = false
    // #swagger.tags = ['Gateway']
    // #swagger.description = 'Endpoint to delete an specific gateway by it's id'
    // #swagger.parameters['id'] = { description: 'ID of the gateway to be deleted' }

    try {
      const gateway = await this.service.deleteGateway(req.params.id);
      if (!gateway) {
        /* #swagger.responses[404] = {
            description: 'Not Found',
        } */
        return res.status(404).send("Not Found");
      }
      return res.status(204).json(gateway);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async addDevice(req, res) {
    // #swagger.tags = ['Devices']
    // #swagger.description = 'Endpoint to add a device to a gateway'
    // #swagger.parameters['id'] = { description: 'ID of the gateway' }

    /* #swagger.parameters['newDevice'] = {
        in: 'body',
        description: 'Device to be added.',
        required: true,
        schema: { $ref: "#/definitions/AddDevice" }
    } */
    try {
      const gateway = await this.service.addDevice(req.params.id, req.body);
      if (!gateway) {
        return res.status(404).send("Not Found");
      }
      return res.status(201).json(gateway);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async removeDevice(req, res) {
    // #swagger.tags = ['Devices']
    // #swagger.description = 'Endpoint to remove a device from a gateway'
    // #swagger.parameters['id'] = { description: 'ID of the gateway' }
    // #swagger.parameters['deviceId'] = { description: 'ID of the device' }

    try {
      const gateway = await this.service.removeDevice(
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
}

module.exports = {
  GatewayController
};
