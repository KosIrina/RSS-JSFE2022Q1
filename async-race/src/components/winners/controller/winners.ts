import API from '../../../api';
import WinnersView from '../view/winners';
import { Numbers } from '../../../constants';

export default class WinnersController {
  readonly api: API;

  readonly winners: WinnersView;

  constructor() {
    this.api = new API();
    this.winners = new WinnersView();
  }

  public async removeCar(id: string): Promise<void> {
    const carInWinners = document.querySelector(`.winners__row[data-car-id="${id}"]`);
    if (carInWinners) {
      const pageHeader = (document.querySelector('.winners__page-number') as HTMLElement)
        .textContent as string;
      const currentPage: number = +pageHeader.split('#')[Numbers.one];
      await this.api.winners.deleteWinner(+id);
      const winners = document.querySelector('.main__winners') as HTMLElement;
      winners.innerHTML = '';
      this.winners.drawMainWinners();

      await this.winners.drawWinnersContainer(currentPage);
    }
  }
}
