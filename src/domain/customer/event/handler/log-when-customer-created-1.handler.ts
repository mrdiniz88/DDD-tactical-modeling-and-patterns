import IEventHandler from "../../../@shared/event/event-handler.interface";
import CustomerCreated1Event from "../customer-created-1.event";

export default class LogWhenCustomerCreated1
  implements IEventHandler<CustomerCreated1Event>
{
  handle(event: CustomerCreated1Event): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
