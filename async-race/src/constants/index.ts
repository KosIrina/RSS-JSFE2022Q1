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
  two = 2,
  three = 3,
  four = 4,
  six = 6,
  hundred = 100,
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

export const APP_TEXT_CONTENT = {
  title: 'Async Race',
  githubAccount: 'KosIrina',
  copyright: 'Copyright | 2022',
  garage: 'Garage',
  winners: 'Winners',
  previous: 'Previous',
  next: 'Next',
  pageNumber: 'Page #',
  create: 'Create',
  update: 'Update',
  race: 'Race',
  reset: 'Reset',
  generateRandomCars: 'Generate Cars',
  select: 'Select',
  remove: 'Remove',
  startEngine: 'A',
  stopEngine: 'B',
  winnerNumber: 'Number',
  winnerCar: 'Car',
  winnerName: 'Name',
  winnerWins: 'Wins',
  winnerBestTime: 'Best time (in seconds)',
};

export const ADDITIONAL_LINKS = {
  githubLink: 'https://github.com/KosIrina',
  rssLink: 'https://rs.school/js/',
};

export const COLOR = {
  hash: '#',
  possibleSymbols: '0123456789abcdef',
  black: '#000000',
};
