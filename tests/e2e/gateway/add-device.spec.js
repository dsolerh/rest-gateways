const app = require("../../../src/server");
const GatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const {
  createConnection,
  closeConnection,
} = require("../../utils/setup-mongoose-conection");
const supertest = require("supertest");

beforeEach(createConnection);

afterEach(closeConnection);

describe("POST /api/gateway/:id/add-device", () => {
  test("(200 Ok) add device to gateway", async () => {
    const gateway = await GatewayModel.create({
      serialNumber: "G123",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    });
    const data = {
      UID: 10,
      vendor: "vendor",
      status: "online",
    };

    await supertest(app)
      .post(`/api/gateway/${gateway._id}/add-device`)
      .send(data)
      .expect(201)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.devices.length).toBe(1);
        // I only check for this property cause it'll be highly improbable that if this is right
        // the rest won't
        expect(response.body.devices[0].UID).toBe(data.UID);

        // Check data in the database
        const gateway = await GatewayModel.findOne({ _id: response.body._id });
        expect(gateway).toBeTruthy();
        expect(gateway.devices.length).toBe(1);
        expect(gateway.devices[0].UID).toBe(data.UID);
      });
  });

  test("(400 Bad request) invalid ipv4", async () => {
    const gateway = await GatewayModel.create({
      serialNumber: "G123",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    });
    const data = {
      UID: 10,
      vendor: "vendor",
      status: "onlinew", // invalid status
    };

    await supertest(app)
      .post(`/api/gateway/${gateway._id}/add-device`)
      .send(data)
      .expect(400);
  });
});
