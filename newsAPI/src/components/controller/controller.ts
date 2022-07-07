import AppLoader from './appLoader';
import { EndPoint, IArticles, ISources, VoidCallback } from '../../types/types';
import { ENDPOINTS } from '../../constants/constants';

class AppController extends AppLoader {
  public getSources(callback: VoidCallback<ISources>): void {
    super.getResponse<ISources>(
      {
        endpoint: ENDPOINTS.sources as EndPoint,
      },
      callback
    );
  }

  public getInitialNews(callback: VoidCallback<IArticles>): void {
    const sourceId = 'abc-news';
    (document.querySelector('.sources') as HTMLElement).setAttribute('data-source', sourceId);
    (document.querySelector('.news__heading') as HTMLElement).innerText = 'News from ABC News';

    super.getResponse<IArticles>(
      {
        endpoint: ENDPOINTS.articles as EndPoint,
        options: {
          sources: sourceId,
        },
      },
      callback
    );
  }

  public getNews(event: Event, callback: VoidCallback<IArticles>): void {
    let target = event.target as HTMLElement;
    const newsContainer = event.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        (document.querySelector(
          '.news__heading'
        ) as HTMLElement).innerText = `News from ${target.innerText}`;
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResponse<IArticles>(
            {
              endpoint: ENDPOINTS.articles as EndPoint,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
