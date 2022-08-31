import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("p1", "Item 1", 200, 2);
    const orderItem2 = new OrderItem("p2", "Item 2", 100, 3);

    const order1 = new Order("c1", [orderItem1]);
    const order2 = new Order("c1", [orderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(700);
  });

  it("should place an order", () => {
    const customer = new Customer("Customer 1");
    const orderItem = new OrderItem("p1", "Item 1", 10, 1);
  
    const order = OrderService.placeOrder(customer, [orderItem])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)


  });
});
