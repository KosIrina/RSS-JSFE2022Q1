import { APP_TEXT_CONTENT, Numbers } from '../../../constants';
import carImage from '../../../assets/images/car.svg';

export default class WinnersTable {
  public createHeadingsAndBody(): HTMLElement {
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

  public createRow(
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

    [newCell1, newCell2, newCell3, newCell4, newCell5].forEach((cell: HTMLTableCellElement) => {
      cell.classList.add('cell-content');
    });

    return newRow;
  }
}
