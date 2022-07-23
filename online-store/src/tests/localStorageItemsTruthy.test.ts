import LocalStorage from '../pages/localStorage';

describe('LocalStorage', () => {
  const appLocalStorage = new LocalStorage();
  it('to get local storage items they all should be truthy', () => {
    document.body.innerHTML = '<div>' + '</div>';

    localStorage.setItem('KosIrina_store_cart', 'a');
    localStorage.setItem('KosIrina_store_filtersSettings', 'b');
    localStorage.setItem('KosIrina_store_sortSetings', 'c');
    localStorage.setItem('KosIrina_store_searchSetings', 'd');

    JSON.parse = jest.fn().mockImplementationOnce(() => {
      appLocalStorage.getLocalStorage();
    });

    expect(
      localStorage.getItem('KosIrina_store_cart') &&
        localStorage.getItem('KosIrina_store_filtersSettings') &&
        localStorage.getItem('KosIrina_store_sortSetings') &&
        localStorage.getItem('KosIrina_store_searchSetings')
    ).toBeTruthy();
  });
});
