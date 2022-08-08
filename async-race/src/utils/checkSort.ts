import store from '../store';
import { Numbers, SORT_SYMBOLS, WINNERS_ORDER, WINNERS_SORT } from '../constants';

export default class Sort {
  public check(): void {
    const winsButton = document.querySelector('.table-heading__wins-amount') as HTMLElement;
    const winsButtonText = winsButton.textContent as string;
    const bestTimeButton = document.querySelector('.table-heading__best-time') as HTMLElement;
    const bestTimeButtonText = bestTimeButton.textContent as string;
    if (store.sortType === WINNERS_SORT.byWinsNumber) {
      bestTimeButton.textContent = `${bestTimeButtonText.slice(
        Numbers.zero,
        bestTimeButtonText.length - Numbers.one
      )}${SORT_SYMBOLS.none}`;
      if (store.sortOrder === WINNERS_ORDER.ascending) {
        winsButton.textContent = `${winsButtonText.slice(
          Numbers.zero,
          winsButtonText.length - Numbers.one
        )}${SORT_SYMBOLS.ascending}`;
      } else if (store.sortOrder === WINNERS_ORDER.descending) {
        winsButton.textContent = `${winsButtonText.slice(
          Numbers.zero,
          winsButtonText.length - Numbers.one
        )}${SORT_SYMBOLS.descending}`;
      }
    } else if (store.sortType === WINNERS_SORT.byBestTime) {
      winsButton.textContent = `${winsButtonText.slice(
        Numbers.zero,
        winsButtonText.length - Numbers.one
      )}${SORT_SYMBOLS.none}`;
      if (store.sortOrder === WINNERS_ORDER.ascending) {
        bestTimeButton.textContent = `${bestTimeButtonText.slice(
          Numbers.zero,
          bestTimeButtonText.length - Numbers.one
        )}${SORT_SYMBOLS.ascending}`;
      } else if (store.sortOrder === WINNERS_ORDER.descending) {
        bestTimeButton.textContent = `${bestTimeButtonText.slice(
          Numbers.zero,
          bestTimeButtonText.length - Numbers.one
        )}${SORT_SYMBOLS.descending}`;
      }
    }
  }
}
