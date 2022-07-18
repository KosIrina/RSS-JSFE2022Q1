/**
 * @jest-environment jsdom
 */

import LocalStorage from '../components/controller/localStorage';

describe('LocalStorage', () => {
  const localStorage = new LocalStorage();
  it('setLocalStorage() should return undefined', () => {
    document.body.innerHTML = '<div>' + '</div>';
    expect(localStorage.setLocalStorage()).toBeUndefined();
  });
});
