import { AppController } from '../components/controller/controller';

describe('AppController', () => {
  const controller = new AppController();
  it('clearSearch() should clear search input', () => {
    document.body.innerHTML = '<div>' + '  <input class="header__search-input">' + '</div>';
    (document.querySelector('.header__search-input') as HTMLInputElement).value = 'а';
    controller.clearSearch();
    expect((document.querySelector('.header__search-input') as HTMLInputElement).value).toEqual('');
  });
});
