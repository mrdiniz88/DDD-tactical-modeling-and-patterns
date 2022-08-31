import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("product 1", 20);
    const product2 = new Product("product 2", 40);

    const products = [product1, product2];

    ProductService.increasePrice(products, 90);

    expect(product1.price).toBe(38);
    expect(product2.price).toBe(76);
  });
});
