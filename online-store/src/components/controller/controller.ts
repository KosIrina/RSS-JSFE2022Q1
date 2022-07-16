import { AllOptions, Numbers, LINE_BREAK, MAXIMUM_BOOKS_IN_CART } from '../../constants/constants';

export class AppController {
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

    console.log(AllOptions.booksInCart);
  }

  public addBooksToCartFromLocalStorage(): void {
    (document.querySelector('.books-in-cart') as HTMLElement).innerText = `${+AllOptions.booksInCart
      .length}`;
    const booksOnPage = document.querySelectorAll('.book') as NodeListOf<HTMLElement>;
    booksOnPage.forEach((el: HTMLElement): void => {
      for (let index = 0; index < AllOptions.booksInCart.length; index++) {
        if (el.innerHTML.toString().includes(AllOptions.booksInCart[index])) {
          el.classList.add('added');
          (el.querySelector('.book__cart-interaction-icon') as HTMLElement).style.transform =
            'rotate(45deg)';
          break;
        }
      }
    });
  }
}
