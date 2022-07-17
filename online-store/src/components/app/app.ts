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

  public start(): void {
    this.view.drawSliders();
    /* this.view.drawBooks(books); */

    window.addEventListener('beforeunload', this.memory.setLocalStorage);

    window.addEventListener('load', (): void => {
      this.memory.getLocalStorage();
      this.view.drawBooks(this.controller.getBooksFromLocalStorage(books));
      (
        document.querySelectorAll('.book__cart-interaction-icon') as NodeListOf<HTMLElement>
      ).forEach((el: HTMLElement): void =>
        el.addEventListener('click', (event: Event): void => this.controller.addBookToCart(event))
      );
      this.controller.addBooksToCartFromLocalStorage();
    });

    (document.querySelector('.settings__sort-options') as HTMLSelectElement).addEventListener(
      'change',
      (): void => {
        this.view.drawBooks(this.controller.getBooks(books));
        (
          document.querySelectorAll('.book__cart-interaction-icon') as NodeListOf<HTMLElement>
        ).forEach((el: HTMLElement): void =>
          el.addEventListener('click', (event: Event): void => this.controller.addBookToCart(event))
        );
        this.controller.addBooksToCartFromLocalStorage();
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
