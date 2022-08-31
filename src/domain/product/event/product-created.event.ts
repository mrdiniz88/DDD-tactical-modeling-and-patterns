import IEvent from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements IEvent {
  dataTimeOcurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
