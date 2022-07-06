import AppLoader from './appLoader';
import { Everything, AllSources, VoidCallback } from '../../types/types';

class AppController extends AppLoader {
    public getSources(callback: VoidCallback<AllSources>): void {
        super.getResponse<AllSources>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getInitialNews(callback: VoidCallback<Everything>): void {
        const sourceId = 'abc-news';
        (<HTMLDivElement>document.querySelector('.sources')).setAttribute('data-source', sourceId);
        (<HTMLDivElement>document.querySelector('.news__heading')).innerText = 'News from ABC News';

        super.getResponse<Everything>(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            callback
        );
    }

    public getNews(event: Event, callback: VoidCallback<Everything>): void {
        let target = event.target as HTMLElement;
        const newsContainer = event.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                (<HTMLDivElement>document.querySelector('.news__heading')).innerText = `News from ${target.innerText}`;
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResponse<Everything>(
                        {
                            endpoint: 'everything',
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
