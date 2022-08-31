import Product from "../../../../domain/product/entity/product";
import IProductRepository from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async findById(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    return new Product(productModel.name, productModel.price, productModel.id);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map(
      (productModel) =>
        new Product(productModel.name, productModel.price, productModel.id)
    );
  }

  async update(entity: Product): Promise<void> {
    const { name, id, price } = entity;

    await ProductModel.update(
      {
        name,
        price,
      },
      {
        where: {
          id,
        },
      }
    );
  }
}
