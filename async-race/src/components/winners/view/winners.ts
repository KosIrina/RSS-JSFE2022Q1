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
import store from '../../../store';
import { Store } from '../../../types';
import Sort from '../../../utils/checkSort';
import WinnersTable from './winnersTable';

export default class WinnersView {
  readonly common: Common;

  readonly commonController: CommonController;

  readonly api: API;

  readonly sort: Sort;

  readonly winnersTable: WinnersTable;

  constructor() {
    this.common = new Common();
    this.commonController = new CommonController();
    this.api = new API();
    this.sort = new Sort();
    this.winnersTable = new WinnersTable();
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
    const winnersTable = this.winnersTable.createHeadingsAndBody();
    winners.append(winnersTable, pagination);
    (document.querySelector('.table-heading__wins-amount') as HTMLElement).addEventListener(
      'click',
      (): void => {
        this.sortByWins();
      }
    );
    (document.querySelector('.table-heading__best-time') as HTMLElement).addEventListener(
      'click',
      (): void => {
        this.sortByTime();
      }
    );
    this.activateWinnersNextPageButton();
    this.activateWinnersPreviousPageButton();
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
    winningCars.fullData.forEach((winner) => {
      const winnerRow = this.winnersTable.createRow(
        numberInTable,
        winner.color,
        winner.name,
        winner.wins,
        winner.time,
        winner.id
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
    winningCars.fullData.forEach((winner) => {
      const winnerRow = this.winnersTable.createRow(
        numberInTable,
        winner.color,
        winner.name,
        winner.wins,
        winner.time,
        winner.id
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
