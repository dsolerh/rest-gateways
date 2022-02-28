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
describe("PATCH /api/gateway/:id", () => {
  test("(200 Ok) update a gateway", async () => {
    const data = {
      serialNumber: "G212",
      name: "initial name",
      IPV4Address: "123.12.3.1",
    };
    const g = await GatewayModel.create(data);
    data["name"] = "updated name";

    await supertest(app)
      .patch("/api/gateway/" + g._id)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.name).toBe(data.name);

        // Check data in the database
        const gateway = await GatewayModel.findOne({ _id: response.body._id });
        expect(gateway).toBeTruthy();
        expect(gateway.name).toBe(data.name);
      });
  });
});
