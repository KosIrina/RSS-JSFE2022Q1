import API from '../../../api';
import WinnersView from '../view/winners';
import CommonController from '../../common/controller/common';
import { APP_TEXT_CONTENT } from '../../../constants';

export default class WinnersController {
  readonly api: API;

  readonly winners: WinnersView;

  readonly appController: CommonController;

  constructor() {
    this.api = new API();
    this.winners = new WinnersView();
    this.appController = new CommonController();
  }

  public async updateWinnersPage(): Promise<void> {
    const currentPage = this.appController.getCurrentPage(APP_TEXT_CONTENT.winners.toLowerCase());
    const winners = document.querySelector('.main__winners') as HTMLElement;
    winners.innerHTML = '';
    this.winners.drawMainWinners();

    await this.winners.drawWinnersContainer(currentPage);
  }

  public async removeCar(id: string): Promise<void> {
    await this.api.winners.deleteWinner(+id);
    this.updateWinnersPage();
  }
}
