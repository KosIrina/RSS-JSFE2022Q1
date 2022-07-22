import { AppController } from '../components/controller/controller';

describe('AppController', () => {
  const controller = new AppController();
  it('clearFiltersChecks() should make checkboxes unchecked (falsy)', () => {
    document.body.innerHTML =
      '<div>' +
      '  <input class="filter-checkbox">' +
      '  <input class="filter-checkbox">' +
      '</div>';
    (document.querySelectorAll('.filter-checkbox') as NodeListOf<HTMLInputElement>).forEach(
      (element: HTMLInputElement): void => {
        element.checked = true;
      }
    );
    controller.clearFiltersChecks();
    (document.querySelectorAll('.filter-checkbox') as NodeListOf<HTMLInputElement>).forEach(
      (element: HTMLInputElement): void => {
        expect(element.checked).toBeFalsy();
      }
    );
  });
});
