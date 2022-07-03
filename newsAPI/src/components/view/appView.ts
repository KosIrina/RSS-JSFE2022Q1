import News from './news/news';
import Sources from './sources/sources';
import { Everything, AllSources } from '../../types/types';

export class AppView {
    readonly news: News;
    readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<Everything>): void {
        const values: Everything['articles'] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Readonly<AllSources>): void {
        const values: AllSources['sources'] = data?.sources ? data?.sources : [];
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
