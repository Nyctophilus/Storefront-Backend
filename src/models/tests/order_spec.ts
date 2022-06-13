import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { OrderStore } from "../order";
import { User, UserStore } from "../user";
import { ProductStore } from "../product";

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER } = process.env;

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const userInstance = {
  firstname: "Muhammed",
  lastname: "yosry",
  username: "mo-test-name",
};

const userInstancePassword = "dsadlxm2";

const productInstance = {
  name: "thor",
  price: 22,
};

describe("Order Model", () => {
  beforeAll(async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(
      parseInt(BCRYPT_SALT_ROUNDS as string)
    );
    const hashPassword = bcrypt.hashSync(
      pepperedPassword,
      salt
    );

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };
    await userStore.create(user);

    await productStore.create(productInstance);
  });

  it("should have INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have CREATE method", () => {
    expect(store.createOrder).toBeDefined();
  });

  it("should have DELETE method", () => {
    expect(store.deleteOrder).toBeDefined();
  });

  it("CREATE method should add an order", async () => {
    const { status, userId } = await store.createOrder({
      status: "shipped", // ordered - shipped - delivered
      userId: 3,
    });

    expect({ status, userId }).toEqual({
      status: "shipped",
      userId: 3,
    });
  });

  it("INDEX method return orders list", async () => {
    const [{ status, userId }] = await store.index();

    expect({ status, userId }).toEqual({
      status: "shipped",
      userId: 3,
    });
  });

  it("SHOW method should return user orders", async () => {
    const { status, userId } = await store.show("3");

    expect({ status, userId }).toEqual({
      status: "shipped",
      userId: 3,
    });
  });

  it("CREATE order product method should add an order with product-quantity and product-id", async () => {
    // @ts-ignore
    const { quantity, orderId, productId } =
      await store.createOrderProduct({
        quantity: 4,
        orderId: 2,
        productId: 3,
      });

    expect({ quantity, orderId, productId }).toEqual({
      quantity: 4,
      orderId: "2",
      productId: "3",
    });
  });

  it("DELETE order product method should remove order product by order product-id", async () => {
    const result = await store.deleteOrderProduct("4");
    // @ts-ignore
    expect(result).toBe(undefined);
  });

  afterAll(async () => {
    await orderStore.deleteOrderProduct("5");
    await productStore.delete(productInstance.name);
    await orderStore.deleteOrder("3");
    await userStore.delete(userInstance.username);
  });
});
