export interface IArticles {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: Pick<ISource, 'id' | 'name'>;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ISources {
  status: string;
  sources: ISource[];
}

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export type EndPoint = 'sources' | 'everything';

export enum ResponseErrors {
  apiKeyMissing = 401,
  notFound = 404,
}

export type VoidCallback<T> = (data: T) => void;
