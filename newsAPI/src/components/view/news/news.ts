import './news.css';
import { Everything, Article } from '../../../types/types';

class News {
    public draw(data: Everything['articles']): void {
        const news: Article[] =
            data.length >= 10 ? data.filter((_item: Readonly<Article>, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Readonly<Article>, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) (<HTMLElement>newsClone.querySelector('.news__item')).classList.add('alt');

            (<HTMLDivElement>newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
                item.urlToImage || 'news_placeholder.jpg'
            })`;
            (<HTMLUListElement>newsClone.querySelector('.news__meta-author')).textContent =
                item.author || item.source.name;
            (<HTMLUListElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (<HTMLHeadingElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
            (<HTMLHeadingElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            (<HTMLParagraphElement>newsClone.querySelector('.news__description-content')).textContent =
                item.description;
            (<HTMLAnchorElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (<HTMLDivElement>document.querySelector('.news')).innerHTML = '';
        (<HTMLDivElement>document.querySelector('.news')).appendChild(fragment);
    }
}

export default News;
