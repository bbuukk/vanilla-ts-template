const defaultDescriptor = (name) => {
  return {
    get() {
      return this.getAttribute(name);
    },
    set(value) {
      this.setAttribute(name, value);
    },
  };
};

function createWebComponent({
  name,
  template,
  styles = [],
  observedAttributes = [],
  properties = {},
  connectedCallback = () => {},
  attributeChangedCallback = () => {},
  disconnectedCallback = () => {},
}) {
  class CustomComponent extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.initProperties(properties);
    }

    static get observedAttributes() {
      return observedAttributes;
    }

    initProperties(properties) {
      for (const [key, descriptor] of Object.entries(properties)) {
        Object.defineProperty(this, key, descriptor);
      }
      const attrsWithNoProps = observedAttributes.filter(
        (a) => !Object.keys(properties).includes(a),
      );

      for (const key of attrsWithNoProps) {
        Object.defineProperty(this, key, defaultDescriptor(key));
      }
    }

    connectedCallback() {
      this.render();
      connectedCallback.call(this);
    }

    render() {
      if (styles.length) {
        this.shadowRoot.adoptedStyleSheets = styles;
      }

      const templateElement = document.createElement('template');
      templateElement.innerHTML = template;
      this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      attributeChangedCallback.call(this, attrName, oldVal, newVal);
    }

    disconnectedCallback() {
      disconnectedCallback.call(this);
    }

    updateStyles(stylesString) {
      const instanceSheet = new CSSStyleSheet();
      instanceSheet.replaceSync(stylesString);

      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        instanceSheet,
      ];
    }
  }

  customElements.define(name, CustomComponent);
}

export default createWebComponent;
