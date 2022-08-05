export const BASE_LINK = 'http://127.0.0.1:3000';

export const PAGE_URL = {
  garage: 'garage',
  winners: 'winners',
  engine: 'engine',
};

export const TOTAL_COUNT_HEADER = 'X-Total-Count';

export const ENGINE_STATUS = {
  started: 'started',
  stopped: 'stopped',
  drive: 'drive',
};

export const WINNERS_SORT = {
  byId: 'id',
  byWinsNumber: 'wins',
  byBestTime: 'time',
};

export const WINNERS_ORDER = {
  ascending: 'ASC',
  descending: 'DESC',
};

export enum ResponseCodes {
  OK = 200,
  NOT_FOUND = 404,
}

export enum Numbers {
  zero = 0,
  one = 1,
}

export const HTTP_METHOD = {
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const HTTP_HEADER = {
  content: { 'Content-Type': 'application/json' },
};

export enum CarsPerPage {
  seven = 7,
  ten = 10,
}
