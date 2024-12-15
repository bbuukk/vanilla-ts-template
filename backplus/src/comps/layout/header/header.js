import createWebComponent from '../../../utils/create_component.util';

import globStyle from 'assets/styles/classes.scss';

window.on('nav-menu-toggle', (ev) => {
  // when we select new button
  //  check if some menu-button(not current) is already selected
  // if it is we should close it setting open to false, to close its menu, but same time not change classlist of header

  const { btn } = ev.detail;
  const header = document.$('header');
  const menuBtns = header.$$('menu-button');

  const lastActiveBtn = Array.from(menuBtns).find((b) => b !== btn && b.open);

  const logo = header.$('main-logo');
  const img = logo.shadowRoot.$('slot').assignedElements()[0];

  if (btn.open) {
    if (lastActiveBtn) {
      lastActiveBtn.open = false;

      lastActiveBtn.classList.add('fade-out');

      setTimeout(() => {
        lastActiveBtn.classList.remove('open');
      }, 500);
    } else {
      header.classList.add('active');

      img.src = '/dist/assets/images/avaklogo_light.svg';
    }
  } else {
    if (!lastActiveBtn) {
      header.classList.remove('active');
      img.src = '/dist/assets/images/avaklogo_dark.svg';
    }
  }
});

/* import searchBarHtml from './comps/search_bar.html';
import * as searchBarCss from './comps/search_bar.scss';
createComponent('search-bar', searchBarHtml, searchBarCss, false); */

import logoHtml from './comps/logo.html';
import logoCss from './comps/logo.scss';
{
  const st = new CSSStyleSheet();
  const combinedStyles = `${globStyle}\n${logoCss}`;
  st.replaceSync(combinedStyles);
  createWebComponent({
    name: 'main-logo',
    template: logoHtml,
    styles: [st],
  });
}

import menuBtnHtml from './comps/menu_button.html';
import menuBtnCss from './comps/menu_button.scss';
{
  const ATTRS = ['open'];

  const st = new CSSStyleSheet();
  const combinedStyles = `${menuBtnCss}`;
  st.replaceSync(combinedStyles);
  createWebComponent({
    name: 'menu-button',
    template: menuBtnHtml,
    styles: [st],
    observedAttributes: ATTRS,
    properties: {
      open: {
        get() {
          return this.hasAttribute('open');
        },
        set(value) {
          if (value) {
            this.setAttribute('open', 'true');
          } else {
            this.removeAttribute('open');
          }
        },
      },
    },
    connectedCallback() {
      const buttonSlot = this.shadowRoot.$('slot[name="button"]');
      const menuButton = buttonSlot.assignedElements()[0];

      const menu = this.shadowRoot.$('nav');

      menuButton.on('click', () => {
        this.open = !this.open;
      });

      document.on('click', (event) => {
        if (
          !menuButton.contains(event.target) &&
          !menu.contains(event.target) &&
          !this.contains(event.target)
        ) {
          this.open = false;
        }
      });
    },
    attributeChangedCallback(attrName, oldVal, newVal) {
      const attr = attrName.toLowerCase();

      if (attr === 'open') {
        if (oldVal) {
          this.classList.add('fade-out');

          setTimeout(() => {
            this.classList.remove('open');
          }, 500);
        } else {
          this.classList.remove('fade-out');
          this.classList.add('open', 'fade-in');
        }

        window.dispatchEvent(
          new CustomEvent('nav-menu-toggle', {
            detail: { btn: this },
            bubbles: true,
            cancelable: true,
          }),
        );
      }
    },
  });
}
