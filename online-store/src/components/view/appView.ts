import Books from './books/books';
import Sliders from './sliders/sliders';
import { ListOfBooks } from '../../types';

export class AppView {
  readonly books: Books;
  readonly sliders: Sliders;
  constructor() {
    this.books = new Books();
    this.sliders = new Sliders();
  }

  public drawBooks(data: ListOfBooks): void {
    this.books.draw(data);
  }

  public drawSliders(): void {
    this.sliders.create();
  }

  public openMobileFilters(): void {
    (document.querySelector('.settings__filters') as HTMLElement).classList.add('open');
    (document.querySelector('.settings__filters-close') as HTMLElement).classList.add('open');
    (document.querySelector('body') as HTMLElement).classList.add('noscroll');
  }

  public closeMobileFilters(): void {
    (document.querySelector('.settings__filters') as HTMLElement).classList.remove('open');
    (document.querySelector('.settings__filters-close') as HTMLElement).classList.remove('open');
    (document.querySelector('body') as HTMLElement).classList.remove('noscroll');
  }

  public closeOverlay(): void {
    (document.querySelector('.modal-window-wrapper') as HTMLElement).style.display = 'none';
    (document.querySelector('body') as HTMLElement).classList.remove('noscroll');
  }
}

export default AppView;
