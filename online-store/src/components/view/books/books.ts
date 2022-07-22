import './books.css';
import { ListOfBooks, IBook } from '../../../types/types';
import {
  FILTERS,
  NO_MATCHES_FOUND,
  IMAGE_ALT_ATTRIBUTE,
  PLUS_SYMBOL_STRING,
} from '../../../constants/constants';

class Books {
  public draw(data: ListOfBooks): void {
    const books: ListOfBooks = data;
    const booksContainer = document.querySelector('.books') as HTMLElement;
    booksContainer.innerHTML = '';

    if (!books.length) {
      const noBooks: HTMLDivElement = document.createElement('div');
      noBooks.classList.add('no-books-found');
      noBooks.innerText = NO_MATCHES_FOUND;
      booksContainer.append(noBooks);
    }

    books.forEach((item: Readonly<IBook>): void => {
      const article: HTMLElement = document.createElement('article');
      article.classList.add('book');
      booksContainer.append(article);

      const bookProperties: HTMLDivElement = document.createElement('div');
      bookProperties.classList.add('book__cover-and-properties');
      article.append(bookProperties);

      const bookCover: HTMLImageElement = document.createElement('img');
      bookCover.classList.add('book__cover-image');
      bookCover.src = `${item['coverImage']}`;
      bookCover.alt = IMAGE_ALT_ATTRIBUTE;
      bookProperties.append(bookCover);

      const bookInfo: HTMLDivElement = document.createElement('div');
      bookInfo.classList.add('book__information');
      bookProperties.append(bookInfo);

      const bookCategory: HTMLParagraphElement = document.createElement('p');
      bookCategory.classList.add('book__category');
      bookCategory.innerHTML = `<b>${FILTERS.categories}</b> ${item['categories']}`;
      bookInfo.append(bookCategory);

      const bookPublisher: HTMLParagraphElement = document.createElement('p');
      bookPublisher.classList.add('book__publisher');
      bookPublisher.innerHTML = `<b>${FILTERS.publisher}</b> ${item['publisher']}`;
      bookInfo.append(bookPublisher);

      const bookPublished: HTMLParagraphElement = document.createElement('p');
      bookPublished.classList.add('book__published');
      bookPublished.innerHTML = `<b>${FILTERS.published}</b> ${item['published']}`;
      bookInfo.append(bookPublished);

      const bookCoverType: HTMLParagraphElement = document.createElement('p');
      bookCoverType.classList.add('book__cover');
      bookCoverType.innerHTML = `<b>${item['coverType']}</b>`;
      bookInfo.append(bookCoverType);

      const bookQuantity: HTMLParagraphElement = document.createElement('p');
      bookQuantity.classList.add('book__quantity');
      bookQuantity.innerHTML = `<b>${FILTERS.quantityInStock}</b> ${item['quantityInStock']}`;
      bookInfo.append(bookQuantity);

      if (item['bestseller']) {
        const bookBestseller: HTMLParagraphElement = document.createElement('p');
        bookBestseller.classList.add('book__bestseller');
        bookBestseller.innerHTML = `<b>${FILTERS.bestseller}</b>`;
        bookInfo.append(bookBestseller);
      }

      const bookMain: HTMLDivElement = document.createElement('div');
      bookMain.classList.add('book__main-information');
      article.append(bookMain);

      const bookTitlendAuthor: HTMLHeadingElement = document.createElement('h2');
      bookTitlendAuthor.classList.add('book__title-and-author');
      bookTitlendAuthor.innerHTML = `"${item['title']}"<br>${item['author']}`;
      bookMain.append(bookTitlendAuthor);

      const bookCartIcon: HTMLDivElement = document.createElement('div');
      bookCartIcon.classList.add('book__cart-interaction-icon');
      bookCartIcon.innerText = PLUS_SYMBOL_STRING;
      bookMain.append(bookCartIcon);
    });
  }
}

export default Books;
