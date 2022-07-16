import { AllOptions } from '../../constants/constants';
import { IFilters } from '../../types/types';

class LocalStorage {
  public setLocalStorage(): void {
    const сart: string = JSON.stringify(AllOptions.booksInCart);
    const filtersSettings: string = JSON.stringify(AllOptions.filters);
    const sortSetings: string = JSON.stringify(AllOptions.sortOption);
    const searchSettings: string = JSON.stringify(AllOptions.searchContent);

    localStorage.clear();

    localStorage.setItem('KosIrina_store_cart', сart);
    localStorage.setItem('KosIrina_store_filtersSettings', filtersSettings);
    localStorage.setItem('KosIrina_store_sortSetings', sortSetings);
    localStorage.setItem('KosIrina_store_searchSetings', searchSettings);
  }

  public getLocalStorage(): void {
    const cartFromLocalStorage: string[] = JSON.parse(
      localStorage.getItem('KosIrina_store_cart') as string
    );
    const filtersFromLocalStorage: IFilters = JSON.parse(
      localStorage.getItem('KosIrina_store_filtersSettings') as string
    );
    const sortFromLocalStorage: string = JSON.parse(
      localStorage.getItem('KosIrina_store_sortSetings') as string
    );
    const searchFromLocalStorage: string = JSON.parse(
      localStorage.getItem('KosIrina_store_searchSetings') as string
    );

    AllOptions.booksInCart = [...cartFromLocalStorage];
    AllOptions.searchContent = searchFromLocalStorage;
    AllOptions.sortOption = sortFromLocalStorage;
    AllOptions.filters = Object.assign({}, filtersFromLocalStorage);
  }

  public clearLocalStorage(): void {
    AllOptions.booksInCart = [];
    AllOptions.searchContent = '';
    AllOptions.sortOption = '';
    AllOptions.filters = {
      coverType: [],
      publisher: [],
      published: [],
      quantityInStock: [],
      bestseller: false,
      categories: [],
    };
    document.location.reload();
  }
}

export default LocalStorage;
