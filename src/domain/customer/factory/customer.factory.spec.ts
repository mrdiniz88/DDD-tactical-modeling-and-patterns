import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer 01");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 01");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("street", 13, "62823000", "city");

    const customer = CustomerFactory.createWithAddress("Customer", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.address).toBe(address);
  });
});
