import IEventHandler from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ...`);
  }
}
