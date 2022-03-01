const getServer = require("../../../src/server");
const getGatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const supertest = require("supertest");
const mongoose = require("mongoose");

let app, gatewayModel, mongooseInstance;
beforeEach(async () => {
  mongooseInstance = await mongoose.connect(
    "mongodb://localhost:27017/GatewayTestUpdate"
  );
  app = getServer(mongooseInstance);
  gatewayModel = getGatewayModel(mongooseInstance);
});

afterEach((done) => {
  mongooseInstance.connection.db.dropDatabase(() => {
    mongooseInstance.connection.close(() => done());
  });
});

describe("PATCH /api/gateway/:id", () => {
  test("(200 Ok) update a gateway", async () => {
    const data = {
      serialNumber: "G212",
      name: "initial name",
      IPV4Address: "123.12.3.1",
      devices: [
        {
          UID: 10,
          vendor: "vendor",
          status: "online",
        },
      ],
    };
    const g = await gatewayModel.create(data);
    data["name"] = "updated name";
    data["devices"] = [
      {
        UID: 10,
        vendor: "vendor",
        status: "offline",
      },
      {
        UID: 12,
        vendor: "vendor",
        status: "online",
      },
    ];

    await supertest(app)
      .patch("/api/gateway/" + g._id)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.name).toBe(data.name);
        expect(response.body.devices.length).toBe(data.devices.length);

        // Check data in the database
        const gateway = await gatewayModel.findOne({ _id: response.body._id });
        expect(gateway).toBeTruthy();
        expect(gateway.name).toBe(data.name);
        expect(gateway.devices.length).toBe(data.devices.length);
      });
  });

  test("(400 Bad Request) incorrect IPV4 address", async () => {
    const data = {
      serialNumber: "G212",
      name: "initial name",
      IPV4Address: "123.12.3.1",
      devices: [
        {
          UID: 10,
          vendor: "vendor",
          status: "online",
        },
      ],
    };
    const g = await gatewayModel.create(data);
    data["IPV4Address"] = "updated IPV4";

    await supertest(app)
      .patch("/api/gateway/" + g._id)
      .send(data)
      .expect(400); // Bad request
  });

  test("(400 Bad request) invalid periferal data", async () => {
    const data = {
      serialNumber: "G212",
      name: "initial name",
      IPV4Address: "123.12.3.1",
      devices: [
        {
          UID: 10,
          vendor: "vendor",
          status: "online",
        },
      ],
    };
    const g = await gatewayModel.create(data);
    data["devices"] = [{}];

    await supertest(app)
      .patch("/api/gateway/" + g._id)
      .send(data)
      .expect(400); // Bad request
  });

  test("(400 Bad Request) incorrect amount of devices", async () => {
    const data = {
      serialNumber: "G212",
      name: "initial name",
      IPV4Address: "123.12.3.1",
      devices: [
        {
          UID: 10,
          vendor: "vendor",
          status: "online",
        },
      ],
    };
    const g = await gatewayModel.create(data);
    data["devices"] = Array.from({ length: 11 }).fill({
      UID: 10,
      vendor: "vendor",
      status: "online",
    });

    await supertest(app)
      .patch("/api/gateway/" + g._id)
      .send(data)
      .expect(400); // Bad request
  });
});
