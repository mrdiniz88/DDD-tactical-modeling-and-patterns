import OrderItem from "./order-item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(customerId: string, items: OrderItem[], id?: string) {
    this._id = id ?? Math.random().toString(32).substring(2, 10);
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero");
    }

    return true;
  }

  changeCustomer(customerId: string) {
    this._customerId = customerId;
    this.validate();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  calculateTotal() {
    this._total = this._items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this.calculateTotal();
  }

  removeItem(itemId: string) {
    this._items.splice(
      this._items.findIndex((item) => item.id == itemId),
      1
    );
    this.calculateTotal();
  }
}
