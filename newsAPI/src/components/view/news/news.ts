import './news.css';
import { IArticles, IArticle } from '../../../types/types';

class News {
    public draw(data: IArticles['articles']): void {
        const news: IArticle[] =
            data.length >= 10 ? data.filter((_item: Readonly<IArticle>, index: number): boolean => index < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemporary = document.querySelector('#newsItemTemporary') as HTMLTemplateElement;

        news.forEach((item: Readonly<IArticle>, index: number): void => {
            const newsClone = newsItemTemporary.content.cloneNode(true) as HTMLElement;

            if (index % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'news_placeholder.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        !news.length
            ? ((document.querySelector('.news__list') as HTMLElement).innerText = 'Oops! No news found')
            : (((document.querySelector('.news__list') as HTMLElement).innerHTML = ''),
              (document.querySelector('.news__list') as HTMLElement).appendChild(fragment));
    }
}

export default News;
