import { ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it("CREATE method should add product", async () => {
    const { name, price } = await store.create({
      name: "thor",
      price: 22,
    });

    expect({ name, price }).toEqual({
      name: "thor",
      price: 22,
    });
  });

  it("INDEX method should return a list of products", async () => {
    const [{ name, price }] = await store.index();

    expect([{ name, price }]).toEqual([
      {
        name: "thor",
        price: 22,
      },
    ]);
  });

  it("SHOW method should return a product by product name", async () => {
    const { name, price } = await store.show("thor");

    expect({ name, price }).toEqual({
      name: "thor",
      price: 22,
    });
  });

  it("DELETE method should remove a product by product name", async () => {
    await store.delete("banana");
    const result = await store.show("banana");

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});
