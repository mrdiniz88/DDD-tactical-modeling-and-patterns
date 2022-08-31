import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import IOrderRepository from "../../../../domain/checkout/repository/order-reposiroty.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async findById(id: string): Promise<Order> {
    try {
      var orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
      });
    } catch (err) {
      throw new Error("Order not found");
    }

    const order = new Order(
      orderModel.customerId,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.productId,
            item.name,
            item.price,
            item.quantity,
            item.id
          )
      ),
      orderModel.id
    );

    return order;
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { orderId: entity.id },
        transaction: t,
      });

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        orderId: entity.id,
      }));

      await OrderItemModel.bulkCreate(items, { transaction: t });

      //atualização somente do total do pedido
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }

  async findAll(): Promise<Order[]> {
    const orderModel = await OrderModel.findAll({
      include: ["items"],
    });

    const list = orderModel.map((ord) => {
      const order = new Order(
        ord.customerId,
        ord.items.map(
          (item) =>
            new OrderItem(
              item.productId,
              item.name,
              item.price,
              item.quantity,
              item.id
            )
        ),
        ord.id
      );

      order.total();

      return order;
    });

    return list;
  }
}
