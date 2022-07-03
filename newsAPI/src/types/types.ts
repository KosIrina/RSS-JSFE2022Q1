export interface Everything {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: Pick<Source, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface AllSources {
    status: string;
    sources: Source[];
}

export interface Source {
    id: string | null;
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
