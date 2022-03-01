const app = require("../../../src/server");
const gatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const {
  createConnection,
  closeConnection,
} = require("../../utils/setup-mongoose-conection");
const supertest = require("supertest");

beforeEach(createConnection);

afterEach(closeConnection);

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
