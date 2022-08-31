import Customer from "../../customer/entity/customer";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed-event";
import CustomerCreated1Event from "../../customer/event/customer-created-1.event";
import CustomerCreated2Event from "../../customer/event/customer-created-2.event";
import LogWhenCustomerAddressChanged from "../../customer/event/handler/log-when-customer-address-changed.handler";
import LogWhenCustomerCreated1 from "../../customer/event/handler/log-when-customer-created-1.handler";
import LogWhenCustomerCreated2 from "../../customer/event/handler/log-when-customer-created-2.handler";
import Address from "../../customer/value-object/address";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  enum eventName {
    CustomerCreated1Event = "CustomerCreated1Event",
    CustomerCreated2Event = "CustomerCreated2Event",
    CustomerAddressChangedEvent = "CustomerAddressChangedEvent",
  }
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0]
    ).toMatchObject(EventHandlerCustomerCreated1);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0]
    ).toMatchObject(EventHandlerCustomerCreated2);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent][0]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0]
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0]
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent][0]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregister(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.unregister(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.unregister(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event].length
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event].length
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event]
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event]
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    const spyEventHandler1 = jest.spyOn(EventHandlerCustomerCreated1, "handle");
    const spyEventHandler2 = jest.spyOn(EventHandlerCustomerCreated2, "handle");
    const spyEventHandler3 = jest.spyOn(
      EventHandlerCustomerAddressChanged2,
      "handle"
    );

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0]
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0]
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent][0]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    const customer = new Customer("Customer 1");
    const customerCreated1Event = new CustomerCreated1Event(null);
    const customerCreated2Event = new CustomerCreated2Event(null);
    const address = new Address("street", 30, "62823-000", "city");

    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerCreated1Event);
    eventDispatcher.notify(customerCreated2Event);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
