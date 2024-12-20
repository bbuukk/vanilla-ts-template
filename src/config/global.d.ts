import { IRouter } from '../services/router.service';

declare global {
  interface DomUtils {
    $: (args: string) => Element | null;
    $$: (args: string) => NodeListOf<Element>;
    on: (
      eventType: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => void;
    off: (
      eventType: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ) => void;
  }

  // eslint-disable-next-line
  interface Document extends DomUtils { }

  // eslint-disable-next-line
  interface HTMLElement extends DomUtils { }

  interface Window extends DomUtils {
    _app: {
      router: IRouter;
    };
  }

  declare let $: (args: string) => Element | null;
  declare let $$: (args: string) => NodeListOf<Element>;
}

export { };

  addEventListener<K extends keyof WindowEventMap>(
    event: K,
    listener:
      | ((this: Window | Document | HTMLElement, ev: WindowEventMap[K]) => void)
      | null,
    options?: AddEventListenerOptions | boolean
  ): void;
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void;
