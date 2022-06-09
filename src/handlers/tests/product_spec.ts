import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
const { JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;

const request = supertest(app);

const productInstance = {
  name: "apple",
  price: 3,
};

describe("Product Handler", () => {
  it("success for CREATE product", async () => {
    const response = await request
      .post("/products")
      .auth(token, { type: "bearer" })
      .send(productInstance);

    expect(response.status).toBe(200);
  });

  it("success for READ product by product name", async () => {
    const response = await request
      .get("/products")
      .send(`productName=${productInstance.name}`);

    expect(response.status).toBe(200);
  });

  it("success for DELETE product by product id", async () => {
    const response = await request
      .delete("/products")
      .auth(token, { type: "bearer" })
      .send({ productName: productInstance.name });

    expect(response.status).toBe(200);
  });
});
