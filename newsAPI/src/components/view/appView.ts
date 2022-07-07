import News from './news/news';
import Sources from './sources/sources';
import { IArticles, ISources } from '../../types/types';
import { Numbers } from '../../constants/constants';

export class AppView {
    readonly news: News;
    readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<IArticles>): void {
        const values: IArticles['articles'] = data?.articles || [];
        this.news.draw(values);
    }

    public drawSources(data: Readonly<ISources>): void {
        const values: ISources['sources'] = data?.sources || [];
        this.sources.draw(values);
    }

    public toggleMobileSources(): void {
        (document.querySelector('.sources__list') as HTMLElement).classList.toggle('open');
        (document.querySelector('.mobile-overlay') as HTMLElement).classList.toggle('open');
        (document.querySelector('body') as HTMLElement).classList.toggle('noscroll');
    }

    public closeMobileSources(): void {
        (document.querySelector('.sources__list') as HTMLElement).classList.remove('open');
        (document.querySelector('.mobile-overlay') as HTMLElement).classList.remove('open');
        (document.querySelector('body') as HTMLElement).classList.remove('noscroll');
    }

    public scrollUp(): void {
        window.scrollTo(Numbers.zero, Numbers.zero);
    }
}

export default AppView;
