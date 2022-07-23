import LocalStorage from '../pages/localStorage';

describe('LocalStorage', () => {
  const localStorage = new LocalStorage();
  it('setLocalStorage() should return undefined', () => {
    document.body.innerHTML = '<div>' + '</div>';
    expect(localStorage.setLocalStorage()).toBeUndefined();
  });
});
