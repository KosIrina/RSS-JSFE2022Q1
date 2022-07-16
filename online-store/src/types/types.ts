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

export type VoidCallback<T> = (data: T) => void;
