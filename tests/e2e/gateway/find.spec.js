const getServer = require("../../../src/server");
const getGatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const supertest = require("supertest");
const mongoose = require("mongoose");

let app, gatewayModel, mongooseInstance;
beforeEach(async () => {
  mongooseInstance = await mongoose.connect(
    "mongodb://localhost:27017/GatewayTestFind"
  );
  app = getServer(mongooseInstance);
  gatewayModel = getGatewayModel(mongooseInstance);
});

afterEach((done) => {
  mongooseInstance.connection.db.dropDatabase(() => {
    mongooseInstance.connection.close(() => done());
  });
});

describe("testing find and find-by-id", () => {
  test("GET /api/gateway", async () => {
    const gateway = await gatewayModel.create({
      serialNumber: "G123",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    });

    await supertest(app)
      .get("/api/gateway")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);

        // Check data
        expect(response.body[0]._id).toBe(gateway.id);
        expect(response.body[0].serialNumber).toBe(gateway.serialNumber);
        expect(response.body[0].name).toBe(gateway.name);
        expect(response.body[0].IPV4Address).toBe(gateway.IPV4Address);
      });
  });

  test("GET /api/gateway/:id", async () => {
    const gateway = await gatewayModel.create({
      serialNumber: "G123",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    });

    await supertest(app)
      .get("/api/gateway/" + gateway.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(gateway.id);
        expect(response.body.serialNumber).toBe(gateway.serialNumber);
        expect(response.body.name).toBe(gateway.name);
        expect(response.body.IPV4Address).toBe(gateway.IPV4Address);
      });
  });
});
