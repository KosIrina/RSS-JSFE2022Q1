import CommonView from './common/view/common';
import GarageView from './garage/view/garage';
import GarageController from './garage/controller/garage';
import WinnersView from './winners/view/winners';
import API from '../api';
import { Numbers, CarsPerPage, APP_TEXT_CONTENT } from '../constants';

export default class App {
  readonly appView: CommonView;

  readonly garageView: GarageView;

  readonly garageController: GarageController;

  readonly winnersView: WinnersView;

  readonly api: API;

  constructor() {
    this.appView = new CommonView();
    this.garageView = new GarageView();
    this.garageController = new GarageController();
    this.winnersView = new WinnersView();
    this.api = new API();
  }

  private drawMainElements(): void {
    this.appView.drawBody();
    this.appView.drawHeader();
    this.appView.drawFooter();
    this.appView.drawMain();
    this.garageView.drawMainGarage();
    this.winnersView.drawMainWinners();
  }

  private switchToWinners(): void {
    (document.querySelector('.main__winners') as HTMLElement).style.display = 'block';
    (document.querySelector('.main__garage') as HTMLElement).style.display = 'none';
    (document.querySelector('.main__winners-button') as HTMLElement).setAttribute('disabled', '');
    (document.querySelector('.main__garage-button') as HTMLElement).removeAttribute('disabled');
  }

  private switchToGarage(): void {
    (document.querySelector('.main__winners') as HTMLElement).style.display = 'none';
    (document.querySelector('.main__garage') as HTMLElement).style.display = 'block';
    (document.querySelector('.main__garage-button') as HTMLElement).setAttribute('disabled', '');
    (document.querySelector('.main__winners-button') as HTMLElement).removeAttribute('disabled');
  }

  public start(): void {
    this.drawMainElements();
    this.garageView.drawGarageContainer(Numbers.one);
    this.winnersView.drawWinnersContainer(Numbers.one);

    (document.querySelector('.main__winners-button') as HTMLElement).addEventListener(
      'click',
      this.switchToWinners
    );

    (document.querySelector('.main__garage-button') as HTMLElement).addEventListener(
      'click',
      this.switchToGarage
    );

    (document.querySelector('.car-creation__button') as HTMLElement).addEventListener(
      'click',
      async (): Promise<void> => {
        const carName: string = (document.querySelector('.car-creation__name') as HTMLInputElement)
          .value;
        const carColor: string = (
          document.querySelector('.car-creation__color') as HTMLInputElement
        ).value;
        const newCar = await this.api.garage.createCar({ name: carName, color: carColor });

        const pageHeader = (document.querySelector('.garage__page-number') as HTMLElement)
          .textContent as string;
        const currentPage: number = +pageHeader.split('#')[Numbers.one];

        const carsContainerHeading = document.querySelector('.garage__heading') as HTMLElement;
        const cars = await this.api.garage.getCars(currentPage);
        carsContainerHeading.innerHTML = `${
          this.appView.createViewName(APP_TEXT_CONTENT.garage, cars.carsTotal).innerHTML
        }`;

        const carsOnCurrentPage: number = (
          document.querySelectorAll('.garage__car') as NodeListOf<HTMLInputElement>
        ).length;
        if (carsOnCurrentPage < CarsPerPage.seven) {
          this.garageView.drawNewCar(newCar.id);
        }
      }
    );

    (document.querySelector('.car-update__button') as HTMLElement).addEventListener(
      'click',
      async (event: Event): Promise<void> => {
        const button = event.target as HTMLElement;
        const carId = button.getAttribute('data-car-id') as string;
        const newName: string = (document.querySelector('.car-update__name') as HTMLInputElement)
          .value;
        const newColor: string = (document.querySelector('.car-update__color') as HTMLInputElement)
          .value;

        await this.api.garage.updateCar(+carId, { name: newName, color: newColor });
        this.garageController.saveEditedCar();

        const carInGarage = document.querySelector(
          `.garage__car[data-car-id="${carId}"]`
        ) as HTMLElement;
        (carInGarage.querySelector('.garage__car-name') as HTMLElement).textContent = `${newName}`;
        (carInGarage.querySelector('.car-image') as HTMLElement).setAttribute(
          'fill',
          `${newColor}`
        );

        const carInWinners = document.querySelector(`.winners__row[data-car-id="${carId}"]`);
        if (carInWinners) {
          (carInWinners.querySelector('.winner-name') as HTMLElement).textContent = `${newName}`;
          (carInWinners.querySelector('.car-image') as HTMLElement).setAttribute(
            'fill',
            `${newColor}`
          );
        }
      }
    );
  }
}
