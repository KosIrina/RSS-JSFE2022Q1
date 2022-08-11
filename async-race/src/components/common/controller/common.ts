import API from '../../../api';
import { Numbers, COLOR, APP_TEXT_CONTENT } from '../../../constants';
import { ICarsData, IWinnersData } from '../../../types';

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

  public async updateTotalCars(
    pageName: string
  ): Promise<{ headingElement: HTMLElement; totalCars: string }> {
    const currentPage = this.getCurrentPage(pageName.toLowerCase());
    const pageHeading = document.querySelector('.garage__heading') as HTMLElement;
    const cars = await this.api.garage.getCars(currentPage);
    return { headingElement: pageHeading, totalCars: cars.carsTotal };
  }

  public async enableNextButton(pageName: string): Promise<void> {
    const currentPage = this.getCurrentPage(pageName.toLowerCase());
    let carsNextPage: ICarsData | IWinnersData;
    if (pageName === APP_TEXT_CONTENT.garage) {
      carsNextPage = await this.api.garage.getCars(currentPage + Numbers.one);
      if (carsNextPage.data.length) {
        (document.querySelector('.garage__next-page-button') as HTMLElement).removeAttribute(
          'disabled'
        );
      }
    }
    if (pageName === APP_TEXT_CONTENT.winners) {
      carsNextPage = await this.api.winners.getWinners(currentPage + Numbers.one);
      if (carsNextPage.fullData.length) {
        (document.querySelector('.winners__next-page-button') as HTMLElement).removeAttribute(
          'disabled'
        );
      }
    }
  }

  public async disableNextButton(pageName: string): Promise<void> {
    const currentPage = this.getCurrentPage(pageName.toLowerCase());
    let carsNextPage: ICarsData | IWinnersData;
    if (pageName === APP_TEXT_CONTENT.garage) {
      carsNextPage = await this.api.garage.getCars(currentPage + Numbers.one);
      if (!carsNextPage.data.length) {
        (document.querySelector('.garage__next-page-button') as HTMLElement).setAttribute(
          'disabled',
          ''
        );
      }
    }
    if (pageName === APP_TEXT_CONTENT.winners) {
      carsNextPage = await this.api.winners.getWinners(currentPage + Numbers.one);
      if (!carsNextPage.fullData.length) {
        (document.querySelector('.winners__next-page-button') as HTMLElement).setAttribute(
          'disabled',
          ''
        );
      }
    }
  }

  public enablePreviousButton(pageName: string): void {
    const currentPage = this.getCurrentPage(pageName.toLowerCase());
    if (currentPage !== Numbers.one) {
      (
        document.querySelector(`.${pageName.toLowerCase()}__previous-page-button`) as HTMLElement
      ).removeAttribute('disabled');
    }
  }

  public disablePreviousButton(pageName: string): void {
    const currentPage = this.getCurrentPage(pageName.toLowerCase());
    if (currentPage === Numbers.one) {
      (
        document.querySelector(`.${pageName.toLowerCase()}__previous-page-button`) as HTMLElement
      ).setAttribute('disabled', '');
    }
  }
}
