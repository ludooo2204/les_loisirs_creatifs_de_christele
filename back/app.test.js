const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should response the GET method at /test", () => {
    return request(app)
      .get("/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});