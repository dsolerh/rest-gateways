const getServer = require("../../../src/server");
const getGatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const supertest = require("supertest");
const mongoose = require("mongoose");

let app, gatewayModel, mongooseInstance;
beforeEach(async () => {
  mongooseInstance = await mongoose.connect(
    "mongodb://localhost:27017/GatewayTestDelete"
  );
  app = getServer(mongooseInstance);
  gatewayModel = getGatewayModel(mongooseInstance);
});

afterEach((done) => {
  mongooseInstance.connection.db.dropDatabase(() => {
    mongooseInstance.connection.close(() => done());
  });
});

describe("DELETE /api/gateway", () => {
  test("(200 Ok) delete an existing gateway", async () => {
    const data = {
      serialNumber: "G212",
      name: "Lorem ipsum",
      IPV4Address: "123.12.3.1",
    };
    const g = await gatewayModel.create(data);

    await supertest(app)
      .delete(`/api/gateway/${g._id}`)
      .expect(204)
      .then(async () => {
        const gateway = await gatewayModel.findById(g._id);
        expect(gateway).toBeNull();
      });
  });

  test("(400 Bad Request) invalid id for mongoose ObjectId", async () => {
    await supertest(app).delete("/api/gateway/qwe121w21").expect(400);
  });

  test("(404 Not Found) cant found the gateway", async () => {
    await supertest(app)
      .delete("/api/gateway/ffffffffffffffffffffffff")
      .expect(404);
  });
});
