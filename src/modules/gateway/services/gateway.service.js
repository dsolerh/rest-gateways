const GatewayModel = require("../models/gateway.model");

console.log("Initializing service: Gateway");

exports.findByPages = ({ limit, page }) => {
  limit = limit && limit <= 100 ? parseInt(limit) : 10;
  page = page ? parseInt(page) : 0;
  page = Number.isInteger(page) ? page : 0;

  return GatewayModel.find()
    .limit(limit)
    .skip(limit * page)
    .exec();
};
exports.findById = (id) => {
  return GatewayModel.findById(id).then((gateway) => {
    if (gateway) {
      gateway = gateway.toJSON();
      delete gateway.__v;
    }
    return gateway;
  });
};
// here a valid concern is to know if you want to relay on the validations of the model
// or you want to develop the validations yourself, either way is valid and has pros and
// cons. I use the validations I created on the model
exports.create = (body) => {
  const gateway = new GatewayModel(body);
  return gateway.save();
};

exports.update = (id, body) => {
  return GatewayModel.findByIdAndUpdate(id, body, {
    returnDocument: "after",
    runValidators: true,
  });
};

exports.delete = (id) => {
  return GatewayModel.findByIdAndDelete(id);
};
