import './sliders.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Numbers, YearsOfPublication, BookQuantity } from '../../../constants/constants';

class Sliders {
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

    noUiSlider.create(sliderByYear, {
      start: [YearsOfPublication.from, YearsOfPublication.to],
      connect: true,
      range: {
        min: YearsOfPublication.from,
        max: YearsOfPublication.to,
      },
      step: Numbers.one,
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed();
        },
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
        to: function (numericValue) {
          return numericValue.toFixed();
        },
      },
    });

    sliderByYear.noUiSlider?.on('update', function (values, handle) {
      yearValues[handle].innerHTML = `${values[handle]}`.slice(Numbers.zero, -Numbers.three);
    });

    sliderByQuantity.noUiSlider?.on('update', function (values, handle) {
      quantityValues[handle].innerHTML = `${values[handle]}`.slice(Numbers.zero, -Numbers.three);
    });
  }
}

export default Sliders;
