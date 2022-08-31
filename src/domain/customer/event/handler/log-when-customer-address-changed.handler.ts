import IEventHandler from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed-event";

export default class LogWhenCustomerAddressChanged
  implements IEventHandler<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, address } = event.eventData;

    const { _street, _number, _zip, _city } = address;

    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${_street}, ${_number}, ${_zip}, ${_city}`
    );
  }
}
