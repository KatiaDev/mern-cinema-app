const supertest = require("supertest");
const server = require("./api/server");

it("[GET] /", async (done) => {
  const res = await supertest(server).get("/");
  expect(res.status).toBe(200);
  done();
});
