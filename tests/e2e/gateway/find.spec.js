const app = require("../../../src/server");
const GatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/GatewayTest",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test("GET /api/gateway", async () => {
  const gateway = await GatewayModel.create({
    serialNumber: "G123",
    name: "Lorem ipsum",
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
    });
});

test("GET /api/gateway/:id", async () => {
  const gateway = await GatewayModel.create({
    serialNumber: "G123",
    name: "Lorem ipsum",
  });

  await supertest(app)
    .get("/api/gateway/" + gateway.id)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(gateway.id);
      expect(response.body.serialNumber).toBe(gateway.serialNumber);
      expect(response.body.name).toBe(gateway.name);
    });
});
