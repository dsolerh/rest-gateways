const getServer = require("../../../src/server");
const getGatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const supertest = require("supertest");
const mongoose = require("mongoose");

let app, gatewayModel, mongooseInstance;
beforeEach(async () => {
  mongooseInstance = await mongoose.connect(
    "mongodb://localhost:27017/GatewayTestRemoveDevice"
  );
  app = getServer(mongooseInstance);
  gatewayModel = getGatewayModel(mongooseInstance);
});

afterEach((done) => {
  mongooseInstance.connection.db.dropDatabase(() => {
    mongooseInstance.connection.close(() => done());
  });
});

describe("DELETE /api/gateway/:id/remove-device/:deviceId", () => {
  test("(204 No content) remove device from gateway", async () => {
    const g = await gatewayModel.create({
      serialNumber: "G123",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
      devices: [
        {
          UID: 10,
          vendor: "vendor",
          status: "online",
        },
      ],
    });

    await supertest(app)
      .delete(
        `/api/gateway/${g._id}/remove-device/${g.devices[0]._id}`
      )
      .expect(204)
      .then(async () => {
        // Check data in the database
        const gateway = await gatewayModel.findOne({ _id: g._id });
        expect(gateway.devices.length).toBe(0);
      });
  });

  test("(404 Bad request) no device found", async () => {
    const gateway = await gatewayModel.create({
      serialNumber: "G123",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    });

    await supertest(app)
      .delete(`/api/gateway/${gateway._id}/remove-device/ffffffffffff`)
      .expect(404);
  });
});
