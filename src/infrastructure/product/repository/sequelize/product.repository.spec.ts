import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("Product 1", 100);

    await productRepository.create(product);

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    const { id, name, price } = await productRepository.findById(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: id,
      name: name,
      price: price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("product 1", 100);

    await productRepository.create(product);

    const product2 = new Product("product 2", 200);

    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });
});
