import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(name);
    customer.changeAddress(address);
    return customer;
  }
}
