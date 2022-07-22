import { ListOfBooks, IBook, WorkWithBooks } from '../../types';
import { AllOptions, Numbers, SORT_OPTIONS, CHECKBOX_FILTERS } from '../../constants/constants';

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

  public search: WorkWithBooks<ListOfBooks> = (dataToSearchIn: ListOfBooks): ListOfBooks => {
    const searchValue: string = (
      document.querySelector('.header__search-input') as HTMLInputElement
    ).value;
    searchValue ? (AllOptions.searchContent = searchValue) : (AllOptions.searchContent = '');
    return dataToSearchIn.filter((element: IBook): boolean =>
      element.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  public filter: WorkWithBooks<ListOfBooks> = (dataToSearchIn: ListOfBooks): ListOfBooks => {
    const allFilterOptions = document.querySelectorAll(
      '.filter-checkbox'
    ) as NodeListOf<HTMLInputElement>;
    const allCheckedOptions: HTMLInputElement[] = [];
    allFilterOptions.forEach((element: HTMLInputElement): void => {
      if (element.checked) allCheckedOptions.push(element);
    });

    allCheckedOptions.forEach((element: HTMLInputElement): void => {
      const label = element.nextElementSibling as HTMLLabelElement;
      let filterName = '';
      if (element.name !== CHECKBOX_FILTERS.popularity) {
        filterName = label.textContent as string;
      }
      switch (element.name) {
        case CHECKBOX_FILTERS.category:
          if (!AllOptions.filters.categories.includes(filterName.toLowerCase())) {
            AllOptions.filters.categories.push(filterName.toLowerCase());
          }
          break;
        case CHECKBOX_FILTERS.publisher:
          if (!AllOptions.filters.publisher.includes(filterName)) {
            AllOptions.filters.publisher.push(filterName);
          }
          break;
        case CHECKBOX_FILTERS.cover:
          if (!AllOptions.filters.coverType.includes(filterName)) {
            AllOptions.filters.coverType.push(filterName);
          }
          break;
        case CHECKBOX_FILTERS.popularity:
          AllOptions.filters.bestseller = true;
          break;
      }
    });

    const namesOfBooksFiltered: string[] = [];
    dataToSearchIn.forEach((element: IBook): void => {
      namesOfBooksFiltered.push(element.title);
    });

    dataToSearchIn.forEach((element: IBook): void => {
      switch (true) {
        case AllOptions.filters.categories.length &&
          !element.categories.filter((category) => AllOptions.filters.categories.includes(category))
            .length:
        case AllOptions.filters.publisher.length &&
          !AllOptions.filters.publisher.includes(element.publisher):
        case AllOptions.filters.coverType.length &&
          !AllOptions.filters.coverType.includes(element.coverType.split(' ')[Numbers.zero]):
        case AllOptions.filters.bestseller && !element.bestseller:
        case AllOptions.filters.published.length &&
          (element.published < AllOptions.filters.published[Numbers.zero] ||
            element.published > AllOptions.filters.published[Numbers.one]):
        case AllOptions.filters.quantityInStock.length &&
          (element.quantityInStock < AllOptions.filters.quantityInStock[Numbers.zero] ||
            element.quantityInStock > AllOptions.filters.quantityInStock[Numbers.one]):
          namesOfBooksFiltered.splice(namesOfBooksFiltered.indexOf(element.title), Numbers.one);
      }
    });

    const booksFiltered: ListOfBooks = [];
    dataToSearchIn.forEach((element: IBook): void => {
      if (namesOfBooksFiltered.includes(element.title)) booksFiltered.push(element);
    });

    return booksFiltered;
  };
}
