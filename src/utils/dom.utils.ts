import {
  AddEventListener,
  RemoveEventListener,
  QuerySelector,
  QuerySelectorAll
} from '../config/global';

const $: QuerySelector = function (args) {
  return this.querySelector(args);
};

const $$: QuerySelectorAll = function (args) {
  return this.querySelectorAll(args);
};

const on: AddEventListener = function (event, listener, options) {
  this.addEventListener(event, listener as EventListener, options);
};

const off: RemoveEventListener = function (event, listener, options) {
  this.removeEventListener(event, listener as EventListener, options);
};

window.$ = $.bind(document);
window.$$ = $$.bind(document);
window.on = on.bind(window) as AddEventListener;
window.off = off.bind(window) as RemoveEventListener;

document.$ = $.bind(document);
document.$$ = $$.bind(document);
document.on = on.bind(document) as AddEventListener;
document.off = off.bind(document) as RemoveEventListener;

HTMLElement.prototype.$ = function (args: string) {
  return $.call(this, args);
};
HTMLElement.prototype.$$ = function (args: string) {
  return $$.call(this, args);
};

HTMLElement.prototype.on = function (event, listener, options) {
  on.call(this, event, listener as EventListener, options);
};

HTMLElement.prototype.off = function (event, listener, options) {
  off.call(this, event, listener as EventListener, options);
};

export {};
