// Define the utility functions
function $(this: Document | HTMLElement, args: string): Element | null {
  return this.querySelector(args);
}

function $$(this: Document | HTMLElement, args: string): NodeListOf<Element> {
  return this.querySelectorAll(args);
}

function on(
  this: EventTarget,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void {
  this.addEventListener(eventType, listener, options);
}

// interface EventListener {
//   (evt: Event): void;
// }
//
// interface EventListenerObject {
//   handleEvent(evt: Event): void;
// }

// function on<K extends keyof WindowEventMap>(
//   this: EventTarget,
//   eventType: K,
//   listener: (this: Window, ev: WindowEventMap[K]) => any,
//   options?: boolean | AddEventListenerOptions
// ): void {
//   this.addEventListener(eventType, listener, options);
// }
//
// addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
//     addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

function off(
  this: EventTarget,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
): void {
  this.removeEventListener(eventType, listener, options);
}

window.$ = $.bind(document);
window.$$ = $$.bind(document);
window.on = on.bind(window);
window.off = off.bind(window);

document.$ = $.bind(document);
document.$$ = $$.bind(document);
document.on = on.bind(document);
document.off = off.bind(document);

HTMLElement.prototype.$ = function (args: string) {
  return $.call(this, args);
};

HTMLElement.prototype.$$ = function (args: string) {
  return $$.call(this, args);
};

HTMLElement.prototype.on = function (
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  on.call(this, eventType, listener, options);
};

HTMLElement.prototype.off = function (
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
) {
  off.call(this, eventType, listener, options);
};

export {};
