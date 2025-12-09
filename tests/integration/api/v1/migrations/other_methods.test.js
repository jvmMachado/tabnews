import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

const methods = ["PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];

test("Methods different than GET and POST should return 405", async () => {
  for (let method of methods) {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: method,
    });
    expect(response.status).toBe(405);
  }
});

test("Should contain only one open connection to the database", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const resonseBody = await response.json();
  expect(resonseBody.dependencies.database.open_connections).toEqual(1);
});
