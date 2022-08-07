import API from '../../../api';
import { Numbers, COLOR } from '../../../constants';
import { ICarsData } from '../../../types';
import CommonView from '../view/common';

export default class CommonController {
  readonly api: API;

  readonly appView: CommonView;

  constructor() {
    this.api = new API();
    this.appView = new CommonView();
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

  public async updateTotalCars(pageName: string): Promise<void> {
    const currentPage = this.getCurrentPage(pageName.toLowerCase());

    const pageHeading = document.querySelector('.garage__heading') as HTMLElement;
    const cars = await this.api.garage.getCars(currentPage);
    pageHeading.innerHTML = `${this.appView.createViewName(pageName, cars.carsTotal).innerHTML}`;
  }
}
