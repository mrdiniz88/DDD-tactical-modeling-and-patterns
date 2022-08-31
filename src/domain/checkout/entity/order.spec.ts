import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
  it("should generate an id even if you don't enter", () => {
    const item = new OrderItem("p1", "Item 1", 200, 1);
    const order = new Order("1", [item]);

    expect(order.id).toHaveLength(8);
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("1", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("p1", "Item 1", 200, 2);
    const item2 = new OrderItem("p2", "Item 1", 300, 3);

    const order = new Order("c1", [item]);

    let total = order.total();
    expect(total).toBe(400);

    const order2 = new Order("c1", [item, item2]);

    total = order2.total();
    expect(total).toBe(1300);
  });

  it("should check if the item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("p1", "Item 1", 200, 0);

      new Order("c1", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
