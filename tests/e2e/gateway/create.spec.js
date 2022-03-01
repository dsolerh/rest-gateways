const getServer = require("../../../src/server");
const getGatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const supertest = require("supertest");
const mongoose = require("mongoose");

let app, gatewayModel, mongooseInstance;
beforeEach(async () => {
  mongooseInstance = await mongoose.connect(
    "mongodb://localhost:27017/GatewayTestCreate"
  );
  app = getServer(mongooseInstance);
  gatewayModel = getGatewayModel(mongooseInstance);
});

afterEach((done) => {
  mongooseInstance.connection.db.dropDatabase(() => {
    mongooseInstance.connection.close(() => done());
  });
});

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
        const gateway = await gatewayModel.findOne({ _id: response.body._id });
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
      devices: [{}],
    };

    await supertest(app).post("/api/gateway").send(data).expect(400);
  });

  test("(400 Bad request) invalid periferal length", async () => {
    const data = {
      serialNumber: "G212",
      name: "Lorem ipsum",
      IPV4Address: "123.12.1.1",
      devices: Array.from({ length: 11 }).fill({
        UID: 10,
        vendor: "vendor",
        status: "online",
      }),
    };

    await supertest(app).post("/api/gateway").send(data).expect(400);
  });
});
