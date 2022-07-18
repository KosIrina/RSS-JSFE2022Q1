import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';
import LocalStorage from '../controller/localStorage';
import books from './books-list';

class App {
  readonly controller: AppController;
  readonly view: AppView;
  readonly memory: LocalStorage;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.memory = new LocalStorage();
  }

  public addToCart(): void {
    (document.querySelectorAll('.book__cart-interaction-icon') as NodeListOf<HTMLElement>).forEach(
      (element: HTMLElement): void =>
        element.addEventListener('click', (event: Event): void =>
          this.controller.addBookToCart(event)
        )
    );
    this.controller.addBooksToCartFromLocalStorage();
  }

  public start(): void {
    this.view.drawSliders();

    window.addEventListener('beforeunload', this.memory.setLocalStorage);

    window.addEventListener('load', (): void => {
      this.memory.getLocalStorage();
      this.view.drawBooks(this.controller.getBooksFromLocalStorage(books));
      this.addToCart();
    });

    (document.querySelector('.settings__sort-options') as HTMLSelectElement).addEventListener(
      'change',
      (): void => {
        this.view.drawBooks(this.controller.getBooks(books));
        this.addToCart();
      }
    );

    (document.querySelector('.header__search-input') as HTMLSelectElement).addEventListener(
      'input',
      (): void => {
        this.view.drawBooks(this.controller.getBooks(books));
        this.addToCart();
      }
    );

    (document.querySelectorAll('.filter-checkbox') as NodeListOf<HTMLInputElement>).forEach(
      (element: HTMLInputElement): void =>
        element.addEventListener('click', (): void => {
          this.controller.clearFiltersSettings();
          this.view.drawBooks(this.controller.getBooks(books));
          this.addToCart();
        })
    );

    (document.querySelector('.settings__filters-reset') as HTMLElement).addEventListener(
      'click',
      (): void => {
        this.controller.clearFiltersSettings();
        this.controller.clearFiltersChecks();
        this.view.drawBooks(this.controller.getBooks(books));
        this.addToCart();
      }
    );

    (document.querySelector('.settings__filters-tablet') as HTMLElement).addEventListener(
      'click',
      this.view.openMobileFilters
    );
    (document.querySelector('.settings__filters-close') as HTMLElement).addEventListener(
      'click',
      this.view.closeMobileFilters
    );
    (document.querySelector('.modal-window-overlay') as HTMLElement).addEventListener(
      'click',
      this.view.closeOverlay
    );
    (document.querySelector('.modal-window__close-button') as HTMLElement).addEventListener(
      'click',
      this.view.closeOverlay
    );
    (document.querySelector('.settings__settings-reset') as HTMLElement).addEventListener(
      'click',
      this.memory.clearLocalStorage
    );
  }
}

export default App;
