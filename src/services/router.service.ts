export interface IRouter {
  init: () => void;
  go: (route: string, addToHistory?: boolean) => void;
}

const Router: IRouter = {
  init: () => {
    $$('a.inLink').forEach((e) => {
      const anchorElement = e as HTMLAnchorElement;

      anchorElement.addEventListener('click', (event) => {
        event.preventDefault();
        const url = new URL(anchorElement.href).pathname;

        Router.go(url);
      });
    });

    window.on('popstate', (event) => {
      Router.go(event.state.route, false);
    });

    Router.go(location.pathname, false);
  },
  go: async (route: string, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, 'null', route);
    }

    let pageContent = '';

    switch (route) {
      case '/google':
        pageContent = await fetch('/pages/google.html').then((res) =>
          res.text()
        );
        break;
      case '/':
        pageContent = await fetch('/pages/home.html').then((res) => res.text());
        break;
      default:
        pageContent = '<h1>404 - Page Not Found</h1>';
        break;
    }

    const mainElement = $('main');
    if (mainElement) {
      mainElement.innerHTML = '';

      const contentElement = document.createElement('div');
      contentElement.innerHTML = pageContent;

      mainElement.appendChild(contentElement);

      window.scrollY = 0;
      window.scrollX = 0;
    }
  }
};

export default Router;
