import LocalStorage from '../pages/localStorage';

describe('LocalStorage', () => {
  const appLocalStorage = new LocalStorage();
  it('clearLocalStorage() should return not defined', () => {
    expect(appLocalStorage.clearLocalStorage()).not.toBeDefined();
  });
});
