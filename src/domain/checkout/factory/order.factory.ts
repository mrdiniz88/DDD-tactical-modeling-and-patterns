import Order from "../entity/order";
import OrderItem from "../entity/order-item";

interface OrderFactoryProps {
  customerId: string;
  items: {
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.productId,
        item.name,
        item.price,
        item.quantity,
      );
    });

    return new Order(props.customerId, items);
  }
}
