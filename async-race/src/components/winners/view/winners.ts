import './winners.css';
import { APP_TEXT_CONTENT, Numbers, CarsPerPage } from '../../../constants';
import Common from '../../common/view/common';
import API from '../../../api';
import carImage from '../../../assets/images/car.svg';

export default class WinnersView {
  readonly common: Common;

  readonly api: API;

  constructor() {
    this.common = new Common();
    this.api = new API();
  }

  public drawMainWinners(): void {
    const winners = document.querySelector('.main__winners') as HTMLElement;
    const pagination = this.common.drawPagination(APP_TEXT_CONTENT.winners.toLowerCase());
    const winnersTable = this.createWinnersTableHeadingsAndBody();
    winners.append(winnersTable, pagination);
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
  }
}
