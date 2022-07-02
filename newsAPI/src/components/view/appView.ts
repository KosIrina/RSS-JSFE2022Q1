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
}

export default AppView;
