import CustomerFactory from "../../customer/factory/customer.factory";
import ProductFactory from "../../product/factory/product.factory";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {
  it("should create an order", () => {
    const customer = CustomerFactory.create("Customer");

    const product = ProductFactory.create("a", "Product", 30);

    const orderProps = {
      customerId: customer.id,
      items: [
        {
          name: product.name,
          productId: product.id,
          quantity: 30,
          price: product.price,
        },
      ],
    };

    const orderFactory = OrderFactory.create(orderProps);

    expect(orderFactory.id).toBeDefined();
    expect(orderFactory.customerId).toEqual(orderProps.customerId);
    expect(orderFactory.items).toHaveLength(1);
  });
});
