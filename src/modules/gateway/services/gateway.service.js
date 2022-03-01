const GatewayModel = require("../models/gateway.model");

console.log("Initializing service: Gateway");

// here a valid concern is to know if you want to relay on the validations of the model
// or you want to develop the validations yourself, either way is valid and has pros and
// cons. I use the validations I created on the model

async function findByPages({ limit, page }) {
  limit = limit && limit <= 100 ? parseInt(limit) : 10;
  page = page ? parseInt(page) : 0;
  page = Number.isInteger(page) ? page : 0;

  return GatewayModel.find()
    .limit(limit)
    .skip(limit * page)
    .exec();
}

async function findById(id) {
  return GatewayModel.findById(id).then((gateway) => {
    if (gateway) {
      gateway = gateway.toJSON();
      delete gateway.__v;
    }
    return gateway;
  });
}

async function createGateway(body) {
  const gateway = new GatewayModel(body);
  return gateway.save();
}

async function updateGateway(id, body) {
  return GatewayModel.findByIdAndUpdate(id, body, {
    returnDocument: "after",
    runValidators: true,
  });
}

async function deleteGateway(id) {
  return GatewayModel.findByIdAndDelete(id);
}

async function addDevice(id, device) {
  const gateway = await GatewayModel.findById(id);
  if (!gateway) {
    return null;
  }
  gateway.devices.push(device);
  await gateway.save();
  return findById(id);
}

async function removeDevice(id, deviceId) {
  const gateway = await GatewayModel.findById(id);
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

module.exports = {
  findByPages,
  findById,
  deleteGateway,
  updateGateway,
  createGateway,
  addDevice,
  removeDevice,
};
