import IEventDispatcher from "./event-dispatcher.interface";
import IEventHandler from "./event-handler.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  register(
    eventName: string,
    eventHandler: eventHandlerInterface<eventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: eventHandlerInterface<eventInterface>
  ): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index != -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }
}
