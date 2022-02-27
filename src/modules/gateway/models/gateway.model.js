const { Schema, model } = require("mongoose");
const { IPV4_RGX } = require("../../common/util-regex");

console.log("Initializing model: Gateway");

// Some fields are mark as required based on a common sence
const periferalSchema = new Schema({
  UID: {
    type: Number,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
});

const gatewaySchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  IPV4Address: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return IPV4_RGX.test(v);
      },
      message: (props) => `${props.value} is not a valid IPV4 address`,
    },
  },
  periferals: {
    type: [periferalSchema],
    validate: {
      validator: function (v) {
        return v.length <= 10;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    default: () => [],
  },
});

module.exports = model("Gateway", gatewaySchema);
