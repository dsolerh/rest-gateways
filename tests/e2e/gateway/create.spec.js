const app = require("../../../src/server");
const GatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const {
  createConnection,
  closeConnection,
} = require("../../utils/setup-mongoose-conection");
const supertest = require("supertest");

beforeEach(createConnection);

afterEach(closeConnection);

describe("POST /api/gateway", () => {
  test("(200 Ok) create a valid gateway", async () => {
    const data = {
      serialNumber: "G212",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    };

    await supertest(app)
      .post("/api/gateway")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.serialNumber).toBe(data.serialNumber);
        expect(response.body.name).toBe(data.name);

        // Check data in the database
        const gateway = await GatewayModel.findOne({ _id: response.body._id });
        expect(gateway).toBeTruthy();
        expect(gateway.serialNumber).toBe(data.serialNumber);
        expect(gateway.name).toBe(data.name);
      });
  });

  test("(400 Bad request) invalid ipv4", async () => {
    const data = {
      serialNumber: "G212",
      name: "Lorem ipsum",
      IPV4Address: "123.12.1.567", // this is an invalid IPV4 address
    };

    await supertest(app).post("/api/gateway").send(data).expect(400);
  });

  test("(400 Bad request) invalid periferal data", async () => {
    const data = {
      serialNumber: "G212",
      name: "Lorem ipsum",
      IPV4Address: "123.12.1.1",
      periferals: [{}],
    };

    await supertest(app).post("/api/gateway").send(data).expect(400);
  });

  test("(400 Bad request) invalid periferal length", async () => {
    const data = {
      serialNumber: "G212",
      name: "Lorem ipsum",
      IPV4Address: "123.12.1.1",
      periferals: Array.from({ length: 11 }).fill({
        UID: 10,
        vendor: "vendor",
        status: "online",
      }),
    };

    await supertest(app).post("/api/gateway").send(data).expect(400);
  });
});
