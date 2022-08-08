import API from '../../../api';
import WinnersView from '../view/winners';
import CommonController from '../../common/controller/common';
import { APP_TEXT_CONTENT } from '../../../constants';
import Sort from '../../../utils/checkSort';

export default class WinnersController {
  readonly api: API;

  readonly winners: WinnersView;

  readonly appController: CommonController;

  readonly sort: Sort;

  constructor() {
    this.api = new API();
    this.winners = new WinnersView();
    this.appController = new CommonController();
    this.sort = new Sort();
  }

  public async updateWinnersPage(sortType?: string, sortOrder?: string): Promise<void> {
    const currentPage = this.appController.getCurrentPage(APP_TEXT_CONTENT.winners.toLowerCase());
    const winners = document.querySelector('.main__winners') as HTMLElement;
    winners.innerHTML = '';
    this.winners.drawMainWinners();

    await this.winners.drawWinnersContainer(currentPage, sortType, sortOrder);
  }

  public async removeCar(id: string, sortType?: string, sortOrder?: string): Promise<void> {
    await this.api.winners.deleteWinner(+id);
    this.updateWinnersPage(sortType, sortOrder);
    this.sort.check();
  }
}
