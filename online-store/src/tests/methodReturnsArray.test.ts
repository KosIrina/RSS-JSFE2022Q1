import { Selection } from '../components/controller/selection';
import books from '../data/books-list';

describe('Selection', () => {
  const selection = new Selection();
  const data = [...books];
  it('search() should return array', () => {
    document.body.innerHTML = '<div>' + '  <input class="header__search-input">' + '</div>';
    expect(selection.search(data)).toBeInstanceOf(Array);
  });
});
