import { AllOptions, Numbers, LINE_BREAK, MAXIMUM_BOOKS_IN_CART } from '../../constants/constants';
import { ListOfBooks, WorkWithBooks } from '../../types';
import { Selection } from './selection';

export class AppController {
  readonly selection: Selection;
  constructor() {
    this.selection = new Selection();
  }

  public getBooks: WorkWithBooks<ListOfBooks> = (data: ListOfBooks): ListOfBooks => {
    this.selection.sort(data);
    const sortedAndSearchedBooks = this.selection.search(data);
    const sortedSearchedAndFilteredBooks = this.selection.filter(sortedAndSearchedBooks);
    return sortedSearchedAndFilteredBooks;
  };

  public getBooksFromLocalStorage: WorkWithBooks<ListOfBooks> = (
    data: ListOfBooks
  ): ListOfBooks => {
    const sortOptions = document.querySelectorAll(
      '.settings__sort-option'
    ) as NodeListOf<HTMLOptionElement>;
    for (let index = Numbers.zero; index < sortOptions.length; index++) {
      if (sortOptions[index].text === AllOptions.sortOption) {
        sortOptions[index].selected = true;
      }
    }

    (document.querySelector('.header__search-input') as HTMLInputElement).value =
      AllOptions.searchContent;

    const allCheckboxes = document.querySelectorAll(
      '.filter-checkbox'
    ) as NodeListOf<HTMLInputElement>;

    allCheckboxes.forEach((element: HTMLInputElement): void => {
      const label = element.nextElementSibling as HTMLLabelElement;
      let filterName = '';
      if (label) {
        filterName = label.textContent as string;
      }
      if (
        AllOptions.filters.categories.includes(filterName.toLowerCase()) ||
        AllOptions.filters.publisher.includes(filterName) ||
        AllOptions.filters.coverType.includes(filterName) ||
        (!filterName && AllOptions.filters.bestseller)
      ) {
        element.checked = true;
      }
    });

    return this.getBooks(data);
  };

  public clearFiltersSettings(): void {
    AllOptions.filters.categories = [];
    AllOptions.filters.publisher = [];
    AllOptions.filters.coverType = [];
    AllOptions.filters.bestseller = false;
  }

  public clearFiltersChecks(): void {
    (document.querySelectorAll('.filter-checkbox') as NodeListOf<HTMLInputElement>).forEach(
      (element: HTMLInputElement): void => {
        element.checked = false;
      }
    );
  }

  public clearSearch(): void {
    AllOptions.searchContent = '';
    (document.querySelector('.header__search-input') as HTMLInputElement).value = '';
  }

  public addBookToCart(event: Event): void {
    const target = event.target as HTMLElement;
    const bookToCart = target.closest('.book') as HTMLElement;
    const bookToCartTitleAndAuthor: string = (target.previousElementSibling as HTMLElement)
      .innerText;
    const bookToCartTitle: string = bookToCartTitleAndAuthor.slice(
      Numbers.one,
      bookToCartTitleAndAuthor.indexOf(LINE_BREAK) - Numbers.one
    );
    const booksInCartCounter = document.querySelector('.books-in-cart') as HTMLElement;

    if (!AllOptions.booksInCart.includes(bookToCartTitle)) {
      if (AllOptions.booksInCart.length < MAXIMUM_BOOKS_IN_CART) {
        AllOptions.booksInCart.push(bookToCartTitle);
        booksInCartCounter.innerText = `${+booksInCartCounter.innerText + Numbers.one}`;
        bookToCart.classList.add('added');
        target.style.transform = 'rotate(45deg)';
      } else if (AllOptions.booksInCart.length >= MAXIMUM_BOOKS_IN_CART) {
        (document.querySelector('.modal-window-wrapper') as HTMLElement).style.display = 'block';
        (document.querySelector('body') as HTMLElement).classList.add('noscroll');
      }
    } else {
      AllOptions.booksInCart.splice(AllOptions.booksInCart.indexOf(bookToCartTitle), Numbers.one);
      booksInCartCounter.innerText = `${+booksInCartCounter.innerText - Numbers.one}`;
      bookToCart.classList.remove('added');
      target.style.transform = 'rotate(0)';
    }
  }

  public addBooksToCartFromLocalStorage(): void {
    (document.querySelector('.books-in-cart') as HTMLElement).innerText = `${+AllOptions.booksInCart
      .length}`;
    const booksOnPage = document.querySelectorAll('.book') as NodeListOf<HTMLElement>;
    booksOnPage.forEach((element: HTMLElement): void => {
      for (let index = Numbers.zero; index < AllOptions.booksInCart.length; index++) {
        if (element.innerHTML.toString().includes(AllOptions.booksInCart[index])) {
          element.classList.add('added');
          (element.querySelector('.book__cart-interaction-icon') as HTMLElement).style.transform =
            'rotate(45deg)';
          break;
        }
      }
    });
  }
}
