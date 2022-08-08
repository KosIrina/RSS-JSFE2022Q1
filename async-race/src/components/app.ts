import CommonView from './common/view/common';
import GarageView from './garage/view/garage';
import GarageController from './garage/controller/garage';
import CommonController from './common/controller/common';
import WinnersView from './winners/view/winners';
import API from '../api';
import RandomGenerator from '../utils/randomGenerator';
import { Numbers, CarsPerPage, APP_TEXT_CONTENT } from '../constants';
import { ICarParameters, ICar } from '../types';
import store from '../store';

export default class App {
  readonly appView: CommonView;

  readonly garageView: GarageView;

  readonly garageController: GarageController;

  readonly appController: CommonController;

  readonly winnersView: WinnersView;

  readonly api: API;

  readonly randomizer: RandomGenerator;

  constructor() {
    this.appView = new CommonView();
    this.garageView = new GarageView();
    this.garageController = new GarageController();
    this.appController = new CommonController();
    this.winnersView = new WinnersView();
    this.api = new API();
    this.randomizer = new RandomGenerator();
  }

  private drawMainElements(): void {
    this.appView.drawBody();
    this.appView.drawHeader();
    this.appView.drawFooter();
    this.appView.drawMain();
    this.garageView.drawMainGarage();
    this.winnersView.drawMainWinners();
  }

  private activateSwitchToWinners(): void {
    (document.querySelector('.main__winners-button') as HTMLElement).addEventListener(
      'click',
      (): void => {
        (document.querySelector('.main__winners') as HTMLElement).style.display = 'block';
        (document.querySelector('.main__garage') as HTMLElement).style.display = 'none';
        (document.querySelector('.main__winners-button') as HTMLElement).setAttribute(
          'disabled',
          ''
        );
        (document.querySelector('.main__garage-button') as HTMLElement).removeAttribute('disabled');
      }
    );
  }

  private activateSwitchToGarage(): void {
    (document.querySelector('.main__garage-button') as HTMLElement).addEventListener(
      'click',
      (): void => {
        (document.querySelector('.main__winners') as HTMLElement).style.display = 'none';
        (document.querySelector('.main__garage') as HTMLElement).style.display = 'block';
        (document.querySelector('.main__garage-button') as HTMLElement).setAttribute(
          'disabled',
          ''
        );
        (document.querySelector('.main__winners-button') as HTMLElement).removeAttribute(
          'disabled'
        );
      }
    );
  }

  private activateCarCreation(): void {
    (document.querySelector('.car-creation__button') as HTMLElement).addEventListener(
      'click',
      async (): Promise<void> => {
        const carName: string = (document.querySelector('.car-creation__name') as HTMLInputElement)
          .value;
        const carColor: string = (
          document.querySelector('.car-creation__color') as HTMLInputElement
        ).value;
        const newCar = await this.api.garage.createCar({ name: carName, color: carColor });

        const update = await this.appController.updateTotalCars(APP_TEXT_CONTENT.garage);
        update.headingElement.innerHTML = `${
          this.appView.createViewName(APP_TEXT_CONTENT.garage, update.totalCars).innerHTML
        }`;

        const carsOnCurrentPage: number = (
          document.querySelectorAll('.garage__car') as NodeListOf<HTMLInputElement>
        ).length;
        if (carsOnCurrentPage < CarsPerPage.seven) {
          this.garageView.drawNewCar(newCar.id);
        }
        this.appController.enableNextButton(APP_TEXT_CONTENT.garage);
      }
    );
  }

  private activateCarUpdate(): void {
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

  private activateRandomCarsGeneration(): void {
    (document.querySelector('.controller-buttons__generate-cars') as HTMLElement).addEventListener(
      'click',
      async (): Promise<void> => {
        const randomCars = this.randomizer.generateRandomCars();
        const newCars: ICar[] = await Promise.all(
          randomCars.map(
            async (item: ICarParameters): Promise<ICar> => ({
              ...(await this.api.garage.createCar(item)),
            })
          )
        );
        newCars.sort((currentItem: ICar, nextItem: ICar) => currentItem.id - nextItem.id);

        const update = await this.appController.updateTotalCars(APP_TEXT_CONTENT.garage);
        update.headingElement.innerHTML = `${
          this.appView.createViewName(APP_TEXT_CONTENT.garage, update.totalCars).innerHTML
        }`;
        const carsOnCurrentPage: number = (
          document.querySelectorAll('.garage__car') as NodeListOf<HTMLInputElement>
        ).length;
        if (carsOnCurrentPage < CarsPerPage.seven) {
          const carAmountToFillWholePage: number = CarsPerPage.seven - carsOnCurrentPage;
          for (
            let iteration = Numbers.zero;
            iteration < carAmountToFillWholePage;
            iteration += Numbers.one
          ) {
            this.garageView.drawNewCar(newCars[iteration].id);
          }
        }
        this.appController.enableNextButton(APP_TEXT_CONTENT.garage);
      }
    );
  }

  private activateGaragePageSwitch(): void {
    (document.querySelector('.garage__next-page-button') as HTMLElement).addEventListener(
      'click',
      (): void => {
        const currentPage = this.appController.getCurrentPage(
          APP_TEXT_CONTENT.garage.toLowerCase()
        );
        (document.querySelector('.garage__container') as HTMLElement).outerHTML = '';
        this.garageView.drawGarageContainer(currentPage + Numbers.one);
      }
    );

    (document.querySelector('.garage__previous-page-button') as HTMLElement).addEventListener(
      'click',
      (): void => {
        const currentPage = this.appController.getCurrentPage(
          APP_TEXT_CONTENT.garage.toLowerCase()
        );
        (document.querySelector('.garage__container') as HTMLElement).outerHTML = '';
        this.garageView.drawGarageContainer(currentPage - Numbers.one);
      }
    );
  }

  private activateRaceAndReset(): void {
    (document.querySelector('.controller-buttons__race') as HTMLElement).addEventListener(
      'click',
      async (): Promise<void> => {
        store.winner = '';
        store.hasWinner = false;
        store.winnerTime = Numbers.zero;
        const storeInfo = await this.garageController.activateRaceButton();
        const winner = storeInfo.winner as ICar;
        this.api.winners.addWinnerInfo(winner.id, storeInfo.winnerTime / Numbers.thousand);
      }
    );

    (document.querySelector('.controller-buttons__reset') as HTMLElement).addEventListener(
      'click',
      (): void => {
        this.garageController.activateResetButton();
      }
    );
  }

  public start(): void {
    this.drawMainElements();
    this.garageView.drawGarageContainer(Numbers.one);
    this.winnersView.drawWinnersContainer(Numbers.one);
    this.activateSwitchToGarage();
    this.activateSwitchToWinners();
    this.activateCarCreation();
    this.activateCarUpdate();
    this.activateRandomCarsGeneration();
    this.activateGaragePageSwitch();
    this.activateRaceAndReset();
  }
}
