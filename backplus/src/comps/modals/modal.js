document.on('DOMContentLoaded', () => {
  const dialog = document.$('myDialog');

  const openDialogBtn = document.getElementById('openDialogBtn');

  const closeDialogBtns = document.querySelector('#closeDialogBtn');

  openDialogBtn.onclick = () => {
    dialog.showModal();
  };

  closeDialogBtns.forEach((btn) => {
    btn.onclick = () => {
      dialog.close();
    };
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

class Modal extends HTMLElement() {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }
}
