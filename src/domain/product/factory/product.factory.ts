import Product from "../entity/product";
import ProductB from "../entity/product-b";
import IProduct from "../entity/product.interface";

export default class ProductFactory {
  static create(type: string, name: string, price: number): IProduct {
    switch (type) {
      case "a":
        return new Product(name, price);
      case "b":
        return new ProductB(name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
