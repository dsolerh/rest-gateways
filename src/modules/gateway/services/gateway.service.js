const GatewayModel = require("../models/gateway.model");

// here a valid concern is to know if you want to relay on the validations of the model
// or you want to develop the validations yourself, either way is valid and has pros and
// cons. I use the validations I created on the model
class GatewayService {
  constructor(dbInstance) {
    console.log("Initializing service: Gateway");
    this.model = GatewayModel(dbInstance);
  }

  async findByPages({ limit, page }) {
    limit = limit && limit <= 100 ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 0;
    page = Number.isInteger(page) ? page : 0;

    return this.model
      .find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async findById(id) {
    return this.model.findById(id).then((gateway) => {
      if (gateway) {
        gateway = gateway.toJSON();
        delete gateway.__v;
      }
      return gateway;
    });
  }

  async createGateway(body) {
    const gateway = new this.model(body);
    return gateway.save();
  }

  async updateGateway(id, body) {
    return this.model.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async deleteGateway(id) {
    return this.model.findByIdAndDelete(id);
  }

  async addDevice(id, device) {
    const gateway = await this.model.findById(id);
    if (!gateway) {
      return null;
    }
    gateway.devices.push(device);
    await gateway.save();
    return this.findById(id);
  }

  async removeDevice(id, deviceId) {
    const gateway = await this.model.findById(id);
    if (!gateway) {
      return null;
    }
    const device = gateway.devices.id(deviceId);
    if (!device) {
      return null;
    }
    device.remove();
    await gateway.save();
    return findById(id);
  }
}

module.exports = GatewayService;
