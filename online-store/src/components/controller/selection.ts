import { ListOfBooks, IBook } from '../../types/types';
import { AllOptions, Numbers, SORT_OPTIONS } from '../../constants/constants';

export class Selection {
  public sort(dataToSort: ListOfBooks): void {
    const sortElement = document.querySelector('.settings__sort-options') as HTMLSelectElement;
    const selectedSortOption: string = sortElement.options[sortElement.selectedIndex].text;
    selectedSortOption === SORT_OPTIONS.byDefault
      ? (AllOptions.sortOption = '')
      : (AllOptions.sortOption = selectedSortOption);

    switch (selectedSortOption) {
      case SORT_OPTIONS.alphabetically:
        dataToSort.sort((currentElement: IBook, nextElement: IBook): number =>
          currentElement.title > nextElement.title ? Numbers.one : -Numbers.one
        );
        break;
      case SORT_OPTIONS.alphabeticallyReversed:
        dataToSort.sort((currentElement: IBook, nextElement: IBook): number =>
          currentElement.title < nextElement.title ? Numbers.one : -Numbers.one
        );
        break;
      case SORT_OPTIONS.publicationYearAscending:
        dataToSort.sort(
          (currentElement: IBook, nextElement: IBook): number =>
            currentElement.published - nextElement.published
        );
        break;
      case SORT_OPTIONS.publicationYearDescending:
        dataToSort.sort(
          (currentElement: IBook, nextElement: IBook): number =>
            nextElement.published - currentElement.published
        );
        break;
    }
  }
}
