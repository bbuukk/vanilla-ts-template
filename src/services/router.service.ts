import getPageContent from './getPageContent.service';

export interface IRouter {
  init: () => void;
  go: (route: string, addToHistory?: boolean) => Promise<void>;
}

const Router: IRouter = {
  init: async () => {
    await Router.go(location.pathname, false)
      .then(() => {
        const internalLinks = $$('a.inLink');

        internalLinks.forEach((e) => {
          const anchorElement = e as HTMLAnchorElement;

          anchorElement.on('click', (event) => {
            event.preventDefault();

            const url = new URL(anchorElement.href).pathname;

            Router.go(url);
          });
        });
      })
      .catch((error) => {
        // TODO: display error screen
        console.error('Error during router initialization:', error);
      });

    window.on('popstate', (event) => {
      Router.go(event.state.route, false);
    });
  },
  go: async (route: string, addToHistory = true): Promise<void> => {
    if (addToHistory) {
      history.pushState({ route }, 'null', route);
    }

    const pageContent = await getPageContent(route);

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
