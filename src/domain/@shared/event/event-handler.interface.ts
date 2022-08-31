import IEvent from "./event.interface";

export default interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void;
}
