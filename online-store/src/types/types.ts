export interface IBook {
  title: string;
  author: string;
  coverImage: string;
  coverType: string;
  publisher: string;
  published: number;
  quantityInStock: number;
  bestseller: boolean;
  categories: string[];
}

export type ListOfBooks = IBook[];

export interface IOptions {
  booksInCart: string[];
  searchContent: string;
  sortOption: string;
  filters: IFilters;
}

export interface IFilters {
  coverType: string[];
  publisher: string[];
  published: number[];
  quantityInStock: number[];
  bestseller: boolean;
  categories: string[];
}

export type WorkWithBooks<T> = (data: T) => T;
