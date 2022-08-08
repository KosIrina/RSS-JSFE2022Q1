import './winners.css';
import {
  APP_TEXT_CONTENT,
  Numbers,
  CarsPerPage,
  SORT_SYMBOLS,
  WINNERS_ORDER,
  WINNERS_SORT,
} from '../../../constants';
import Common from '../../common/view/common';
import CommonController from '../../common/controller/common';
import API from '../../../api';
import carImage from '../../../assets/images/car.svg';
import store from '../../../store';
import { Store } from '../../../types';
import Sort from '../../../utils/checkSort';

export default class WinnersView {
  readonly common: Common;

  readonly commonController: CommonController;

  readonly api: API;

  readonly sort: Sort;

  constructor() {
    this.common = new Common();
    this.commonController = new CommonController();
    this.api = new API();
    this.sort = new Sort();
  }

  private activateWinnersNextPageButton(): void {
    (document.querySelector('.winners__next-page-button') as HTMLElement).addEventListener(
      'click',
      (): void => {
        const currentPage = this.commonController.getCurrentPage(
          APP_TEXT_CONTENT.winners.toLowerCase()
        );
        (document.querySelector('.winners__heading') as HTMLElement).outerHTML = '';
        (document.querySelector('.winners__page-number') as HTMLElement).outerHTML = '';
        (document.querySelector('.winners__table-body') as HTMLElement).innerHTML = '';
        this.drawWinnersContainer(currentPage + Numbers.one, store.sortType, store.sortOrder);
      }
    );
  }

  private activateWinnersPreviousPageButton(): void {
    (document.querySelector('.winners__previous-page-button') as HTMLElement).addEventListener(
      'click',
      (): void => {
        const currentPage = this.commonController.getCurrentPage(
          APP_TEXT_CONTENT.winners.toLowerCase()
        );
        (document.querySelector('.winners__heading') as HTMLElement).outerHTML = '';
        (document.querySelector('.winners__page-number') as HTMLElement).outerHTML = '';
        (document.querySelector('.winners__table-body') as HTMLElement).innerHTML = '';
        this.drawWinnersContainer(currentPage - Numbers.one, store.sortType, store.sortOrder);
      }
    );
  }

  public drawMainWinners(): void {
    const winners = document.querySelector('.main__winners') as HTMLElement;
    const pagination = this.common.drawPagination(APP_TEXT_CONTENT.winners.toLowerCase());
    const winnersTable = this.createWinnersTableHeadingsAndBody();
    winners.append(winnersTable, pagination);
    this.activateWinnersNextPageButton();
    this.activateWinnersPreviousPageButton();
  }

  private createWinnersTableHeadingsAndBody(): HTMLElement {
    const winnersTable: HTMLElement = document.createElement('table');
    winnersTable.classList.add('winners__table');

    const winnersTableHeading: HTMLElement = document.createElement('thead');
    winnersTableHeading.classList.add('winners__table-heading');
    const winnersTableBody: HTMLElement = document.createElement('tbody');
    winnersTableBody.classList.add('winners__table-body');

    const winnersTableHeadingLine: HTMLElement = document.createElement('tr');
    const winnersTableHeadingNumber: HTMLElement = document.createElement('th');
    winnersTableHeadingNumber.classList.add('cell-heading', 'table-heading__number');
    winnersTableHeadingNumber.textContent = APP_TEXT_CONTENT.winnerNumber;
    const winnersTableHeadingCarImage: HTMLElement = document.createElement('th');
    winnersTableHeadingCarImage.classList.add('cell-heading', 'table-heading__car-image');
    winnersTableHeadingCarImage.textContent = APP_TEXT_CONTENT.winnerCar;
    const winnersTableHeadingCarName: HTMLElement = document.createElement('th');
    winnersTableHeadingCarName.classList.add('cell-heading', 'table-heading__car-name');
    winnersTableHeadingCarName.textContent = APP_TEXT_CONTENT.winnerName;
    const winnersTableHeadingWins: HTMLElement = document.createElement('th');
    winnersTableHeadingWins.classList.add('cell-heading', 'table-heading__wins-amount');
    winnersTableHeadingWins.textContent = APP_TEXT_CONTENT.winnerWins;
    const winnersTableHeadingTime: HTMLElement = document.createElement('th');
    winnersTableHeadingTime.classList.add('cell-heading', 'table-heading__best-time');
    winnersTableHeadingTime.textContent = APP_TEXT_CONTENT.winnerBestTime;
    winnersTableHeadingLine.append(
      winnersTableHeadingNumber,
      winnersTableHeadingCarImage,
      winnersTableHeadingCarName,
      winnersTableHeadingWins,
      winnersTableHeadingTime
    );

    winnersTableHeading.append(winnersTableHeadingLine);
    winnersTable.append(winnersTableHeading, winnersTableBody);
    winnersTableHeadingWins.addEventListener('click', (): void => {
      this.sortByWins();
    });
    winnersTableHeadingTime.addEventListener('click', (): void => {
      this.sortByTime();
    });
    return winnersTable;
  }

  private createWinnerTableRow(
    number: number,
    color: string,
    name: string,
    wins: number,
    time: number,
    id: number
  ): HTMLElement {
    const newRow: HTMLTableRowElement = document.createElement('tr');
    newRow.classList.add('winners__row');
    newRow.dataset.carId = `${id}`;
    const newCell1 = newRow.insertCell(Numbers.zero);
    newCell1.textContent = `${number}`;

    const newCell2 = newRow.insertCell(Numbers.one);
    const carImageElement: HTMLElement = document.createElement('div');
    carImageElement.classList.add('winners__car-image');
    carImageElement.innerHTML = `<svg class="car-image" fill="${color}"><use xlink:href="${carImage}#car-image"></use></svg>`;
    newCell2.append(carImageElement);

    const newCell3 = newRow.insertCell(Numbers.two);
    newCell3.classList.add('winner-name');
    newCell3.textContent = `${name}`;
    const newCell4 = newRow.insertCell(Numbers.three);
    newCell4.classList.add('winner-wins');
    newCell4.textContent = `${wins}`;
    const newCell5 = newRow.insertCell(Numbers.four);
    newCell5.classList.add('winner-best-time');
    newCell5.textContent = `${time}`;

    [newCell1, newCell2, newCell3, newCell4, newCell5].forEach((item: HTMLTableCellElement) => {
      item.classList.add('cell-content');
    });

    return newRow;
  }

  public async sortByWins(): Promise<Store> {
    const winsButton = document.querySelector('.table-heading__wins-amount') as HTMLElement;
    const winsButtonText = winsButton.textContent as string;
    const currentSortSymbol = winsButtonText.slice(-Numbers.one);
    if (currentSortSymbol === SORT_SYMBOLS.none || currentSortSymbol === SORT_SYMBOLS.descending) {
      store.sortType = WINNERS_SORT.byWinsNumber;
      store.sortOrder = WINNERS_ORDER.ascending;

      const currentPage = this.commonController.getCurrentPage(
        APP_TEXT_CONTENT.winners.toLowerCase()
      );
      await this.drawSortedWinners(currentPage, WINNERS_SORT.byWinsNumber, WINNERS_ORDER.ascending);
      this.sort.check();
    } else if (currentSortSymbol === SORT_SYMBOLS.ascending) {
      store.sortType = WINNERS_SORT.byWinsNumber;
      store.sortOrder = WINNERS_ORDER.descending;

      const currentPage = this.commonController.getCurrentPage(
        APP_TEXT_CONTENT.winners.toLowerCase()
      );
      await this.drawSortedWinners(
        currentPage,
        WINNERS_SORT.byWinsNumber,
        WINNERS_ORDER.descending
      );
      this.sort.check();
    }
    return store;
  }

  public async sortByTime(): Promise<Store> {
    const timeButton = document.querySelector('.table-heading__best-time') as HTMLElement;
    const timeButtonText = timeButton.textContent as string;
    const currentSortSymbol = timeButtonText.slice(-Numbers.one);
    if (currentSortSymbol === SORT_SYMBOLS.none || currentSortSymbol === SORT_SYMBOLS.descending) {
      store.sortType = WINNERS_SORT.byBestTime;
      store.sortOrder = WINNERS_ORDER.ascending;

      const currentPage = this.commonController.getCurrentPage(
        APP_TEXT_CONTENT.winners.toLowerCase()
      );
      await this.drawSortedWinners(currentPage, WINNERS_SORT.byBestTime, WINNERS_ORDER.ascending);
      this.sort.check();
    } else if (currentSortSymbol === SORT_SYMBOLS.ascending) {
      store.sortType = WINNERS_SORT.byBestTime;
      store.sortOrder = WINNERS_ORDER.descending;

      const currentPage = this.commonController.getCurrentPage(
        APP_TEXT_CONTENT.winners.toLowerCase()
      );
      await this.drawSortedWinners(currentPage, WINNERS_SORT.byBestTime, WINNERS_ORDER.descending);
      this.sort.check();
    }
    return store;
  }

  public async drawWinnersContainer(page: number, sort?: string, order?: string): Promise<void> {
    const winners = document.querySelector('.main__winners') as HTMLElement;
    const winningCars = await this.api.winners.getWinners(page, sort, order);
    const containerHeading = this.common.createViewName(
      APP_TEXT_CONTENT.winners,
      winningCars.winnersTotal
    );
    const pageNumber = this.common.createPageNumber(APP_TEXT_CONTENT.winners, page);

    let numberInTable: number;
    if (page === Numbers.one) {
      numberInTable = Numbers.one;
    } else {
      numberInTable = CarsPerPage.ten * (page - Numbers.one) + Numbers.one;
    }

    const winnersTableBody = document.querySelector('.winners__table-body') as HTMLElement;
    winningCars.fullData.forEach((item) => {
      const winnerRow = this.createWinnerTableRow(
        numberInTable,
        item.color,
        item.name,
        item.wins,
        item.time,
        item.id
      );
      winnersTableBody.append(winnerRow);
      numberInTable += Numbers.one;
    });

    winners.prepend(containerHeading, pageNumber);
    this.commonController.enableNextButton(APP_TEXT_CONTENT.winners);
    this.commonController.disableNextButton(APP_TEXT_CONTENT.winners);
    this.commonController.disablePreviousButton(APP_TEXT_CONTENT.winners);
    this.commonController.enablePreviousButton(APP_TEXT_CONTENT.winners);
  }

  public async drawSortedWinners(page: number, sort?: string, order?: string): Promise<void> {
    const winningCars = await this.api.winners.getWinners(page, sort, order);

    let numberInTable: number;
    if (page === Numbers.one) {
      numberInTable = Numbers.one;
    } else {
      numberInTable = CarsPerPage.ten * (page - Numbers.one) + Numbers.one;
    }

    const winnersTableBody = document.querySelector('.winners__table-body') as HTMLElement;
    winnersTableBody.innerHTML = '';
    winningCars.fullData.forEach((item) => {
      const winnerRow = this.createWinnerTableRow(
        numberInTable,
        item.color,
        item.name,
        item.wins,
        item.time,
        item.id
      );
      winnersTableBody.append(winnerRow);
      numberInTable += Numbers.one;
    });

    this.commonController.enableNextButton(APP_TEXT_CONTENT.winners);
    this.commonController.disableNextButton(APP_TEXT_CONTENT.winners);
    this.commonController.disablePreviousButton(APP_TEXT_CONTENT.winners);
    this.commonController.enablePreviousButton(APP_TEXT_CONTENT.winners);
  }
}
