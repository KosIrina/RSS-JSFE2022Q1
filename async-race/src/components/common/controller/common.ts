import API from '../../../api';
import { Numbers, COLOR } from '../../../constants';
import { ICarsData } from '../../../types';

export default class CommonController {
  readonly api: API;

  constructor() {
    this.api = new API();
  }

  public getCurrentPage(pageName: string): number {
    const pageHeader = (document.querySelector(`.${pageName}__page-number`) as HTMLElement)
      .textContent as string;
    const currentPage: number = +pageHeader.split(COLOR.hash)[Numbers.one];
    return currentPage;
  }

  public async getNextPage(pageName: string): Promise<ICarsData> {
    const currentPage: number = this.getCurrentPage(pageName);
    const nextPage: ICarsData = await this.api.garage.getCars(currentPage + Numbers.one);
    return nextPage;
  }
}
