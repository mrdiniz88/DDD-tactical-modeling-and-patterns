import Address from "../value-object/address";
import Customer from "./customer";


describe("Customer unit tests", () => {

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("Igor");
    customer.changeName("Diniz");

    expect(customer.name).toBe("Diniz");
  });

  it("should activete customer", () => {
    const customer = new Customer("Igor");
    const address = new Address("Street 1", 1, "12345-000", "City 1");
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivete customer", () => {
    const customer = new Customer("Igor");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("Igor");

      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(15);
    expect(customer.rewardPoints).toBe(25);
  });
});
