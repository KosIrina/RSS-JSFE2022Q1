import { IOptions } from '../types/types';

export enum Numbers {
  zero = 0,
  one = 1,
  three = 3,
}

export enum YearsOfPublication {
  from = 2011,
  to = 2022,
}

export enum BookQuantity {
  minimum = 1,
  maximum = 9,
}

export const AllOptions: IOptions = {
  booksInCart: [],
  searchContent: '',
  sortOption: '',
  filters: {
    coverType: [],
    publisher: [],
    published: [],
    quantityInStock: [],
    bestseller: false,
    categories: [],
  },
};

export const LINE_BREAK = '\n';

export const MAXIMUM_BOOKS_IN_CART = 20;

export const SORT_OPTIONS = {
  byDefault: 'по умолчанию',
  alphabetically: 'по названию, от А до Я',
  alphabeticallyReversed: 'по названию, от Я до А',
  publicationYearAscending: 'по году издания, по возрастанию',
  publicationYearDescending: 'по году издания, по убыванию',
};

export const CHECKBOX_FILTERS = {
  category: 'category',
  publisher: 'publisher',
  cover: 'cover',
  popularity: 'popularity',
};
