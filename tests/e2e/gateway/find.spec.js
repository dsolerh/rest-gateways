const app = require("../../../src/server");
const gatewayModel = require("../../../src/modules/gateway/models/gateway.model");
const {
  createConnection,
  closeConnection,
} = require("../../utils/setup-mongoose-conection");
const supertest = require("supertest");

beforeEach(createConnection);

afterEach(closeConnection);

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
