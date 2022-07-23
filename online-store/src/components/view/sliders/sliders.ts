import './sliders.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {
  Numbers,
  YearsOfPublication,
  BookQuantity,
  AllOptions,
} from '../../../constants/constants';
import LocalStorage from '../../../pages/localStorage';
import { AppController } from '../../controller/controller';
import { AppView } from '../appView';
import books from '../../../data/books-list';

class Sliders {
  readonly memory: LocalStorage;
  constructor() {
    this.memory = new LocalStorage();
  }

  public create(): void {
    const sliderByYear = document.querySelector('.filter-by-year-slider') as noUiSlider.target;
    const sliderByQuantity = document.querySelector(
      '.filter-by-quantity-slider'
    ) as noUiSlider.target;
    const yearValues = [
      document.querySelector('.year-value-start') as HTMLElement,
      document.querySelector('.year-value-end') as HTMLElement,
    ];
    const quantityValues = [
      document.querySelector('.quantity-value-start') as HTMLElement,
      document.querySelector('.quantity-value-end') as HTMLElement,
    ];
    const newController: AppController = new AppController();
    const newView: AppView = new AppView();

    noUiSlider.create(sliderByYear, {
      start: [YearsOfPublication.from, YearsOfPublication.to],
      connect: true,
      range: {
        min: YearsOfPublication.from,
        max: YearsOfPublication.to,
      },
      step: Numbers.one,
      tooltips: {
        to: (numericValue) => numericValue.toFixed(),
      },
    });

    noUiSlider.create(sliderByQuantity, {
      start: [BookQuantity.minimum, BookQuantity.maximum],
      connect: true,
      range: {
        min: BookQuantity.minimum,
        max: BookQuantity.maximum,
      },
      step: Numbers.one,
      tooltips: {
        to: (numericValue) => numericValue.toFixed(),
      },
    });

    sliderByYear.noUiSlider?.on('update', (values, handle): void => {
      yearValues[handle].innerHTML = `${values[handle]}`.slice(Numbers.zero, -Numbers.three);
    });

    sliderByQuantity.noUiSlider?.on('update', (values, handle): void => {
      quantityValues[handle].innerHTML = `${values[handle]}`.slice(Numbers.zero, -Numbers.three);
    });

    window.addEventListener('load', (): void => {
      this.memory.getLocalStorage();
      sliderByYear.noUiSlider?.set([...AllOptions.filters.published]);
      sliderByQuantity.noUiSlider?.set([...AllOptions.filters.quantityInStock]);
    });

    sliderByYear.noUiSlider?.on('change', (): void => {
      AllOptions.filters.published = sliderByYear.noUiSlider?.get(true) as number[];
      newController.clearFiltersSettings();
      newView.drawBooks(newController.getBooks(books));
      (
        document.querySelectorAll('.book__cart-interaction-icon') as NodeListOf<HTMLElement>
      ).forEach((element: HTMLElement): void =>
        element.addEventListener('click', (event: Event): void =>
          newController.addBookToCart(event)
        )
      );
      newController.addBooksToCartFromLocalStorage();
    });

    sliderByQuantity.noUiSlider?.on('change', (): void => {
      AllOptions.filters.quantityInStock = sliderByQuantity.noUiSlider?.get(true) as number[];
      newController.clearFiltersSettings();
      newView.drawBooks(newController.getBooks(books));
      (
        document.querySelectorAll('.book__cart-interaction-icon') as NodeListOf<HTMLElement>
      ).forEach((element: HTMLElement): void =>
        element.addEventListener('click', (event: Event): void =>
          newController.addBookToCart(event)
        )
      );
      newController.addBooksToCartFromLocalStorage();
    });

    (document.querySelector('.settings__filters-reset') as HTMLElement).addEventListener(
      'click',
      (): void => {
        sliderByYear.noUiSlider?.reset();
        AllOptions.filters.published = sliderByYear.noUiSlider?.get(true) as number[];
        sliderByQuantity.noUiSlider?.reset();
        AllOptions.filters.quantityInStock = sliderByQuantity.noUiSlider?.get(true) as number[];
      }
    );
  }
}

export default Sliders;
