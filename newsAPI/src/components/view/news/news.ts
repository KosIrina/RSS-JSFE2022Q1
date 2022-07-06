import './news.css';
import { Everything, Article } from '../../../types/types';

class News {
    public draw(data: Everything['articles']): void {
        const news: Article[] =
            data.length >= 10 ? data.filter((_item: Readonly<Article>, index: number) => index < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemporary = document.querySelector('#newsItemTemporary') as HTMLTemplateElement;

        news.forEach((item: Readonly<Article>, index: number) => {
            const newsClone = newsItemTemporary.content.cloneNode(true) as HTMLElement;

            if (index % 2) (<HTMLElement>newsClone.querySelector('.news__item')).classList.add('alt');

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

        !news.length
            ? ((<HTMLDivElement>document.querySelector('.news__list')).innerText = 'Oops! No news found')
            : (((<HTMLDivElement>document.querySelector('.news__list')).innerHTML = ''),
              (<HTMLDivElement>document.querySelector('.news__list')).appendChild(fragment));
    }
}

export default News;
