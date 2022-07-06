import News from './news/news';
import Sources from './sources/sources';
import { IArticles, ISources } from '../../types/types';

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
        (<HTMLDivElement>document.querySelector('.sources__list')).classList.toggle('open');
        (<HTMLDivElement>document.querySelector('.mobile-overlay')).classList.toggle('open');
        (<HTMLBodyElement>document.querySelector('body')).classList.toggle('noscroll');
    }

    public closeMobileSources(): void {
        (<HTMLDivElement>document.querySelector('.sources__list')).classList.remove('open');
        (<HTMLDivElement>document.querySelector('.mobile-overlay')).classList.remove('open');
        (<HTMLBodyElement>document.querySelector('body')).classList.remove('noscroll');
    }

    public scrollUp(): void {
        window.scrollTo(0, 0);
    }
}

export default AppView;
