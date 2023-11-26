const request = require("supertest");
const { server, httpServer } = require("./index");

describe("Test /api/hello endpoint", () => {
  afterAll((done) => {
    // Close the server after all tests are completed
    httpServer.close(done);
  });

  it("should return a hello message", async () => {
    const response = await request(httpServer).get("/api/hello");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello, Azure!" });
  });
});
