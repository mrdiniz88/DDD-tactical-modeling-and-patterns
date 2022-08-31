export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    productId: string,
    name: string,
    price: number,
    quantity: number,
    id?: string
  ) {
    this._id = id ?? Math.random().toString(32).substring(2, 10);
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get totalPrice(): number {
    return this._price * this._quantity;
  }
}
