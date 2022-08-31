import RepositoryInterface from "../../@shared/repository/repository.interface";
import Product from "../entity/product";

export default interface IProductRepository
  extends RepositoryInterface<Product> {}
