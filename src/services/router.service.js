const Router = {
  init: () => {
    $$('a.in-link').forEach((e) => {
      if (e instanceof HTMLAnchorElement) {
        e.on('click', (event) => {
          event.preventDefault();
          const url = new URL(e.href).pathname;

          Router.go(url);
        });
      }
    });
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false);
    });
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, 'null', route);
    }

    let pageElem = null;

    switch (route) {
      case '/google':
        pageElem = document.createElement('h1');
        pageElem.textContent = 'It is / route, definately!';
        break;
      case '/':
        pageElem = document.createElement('main-page');
        break;
    }

    if (pageElem) {
      const mainElement = $('main');
      if (mainElement) {
        mainElement.innerHTML = '';
        mainElement.appendChild(pageElem);
        window.scrollY = 0;
        window.scrollX = 0;
      }
    } else {
      //todo create 404 page for not valid route
    }
  },
};

export default Router;
