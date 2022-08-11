import API from '../../../api';
import CommonController from '../../common/controller/common';
import CommonView from '../../common/view/common';
import { COLOR, APP_TEXT_CONTENT, Numbers, ENGINE_STATUS } from '../../../constants';
import { IRaceParameters, ICar, Store, EngineStatus } from '../../../types';
import Animation from '../../../utils/animation';
import store from '../../../store';

export default class GarageController {
  readonly api: API;

  readonly appController: CommonController;

  readonly appView: CommonView;

  readonly animation: Animation;

  constructor() {
    this.api = new API();
    this.appController = new CommonController();
    this.appView = new CommonView();
    this.animation = new Animation();
  }

  public editCar(name: string, color: string, id: number): void {
    const nameInput = document.querySelector('.car-update__name') as HTMLInputElement;
    const colorInput = document.querySelector('.car-update__color') as HTMLInputElement;
    const updateButton = document.querySelector('.car-update__button') as HTMLElement;

    nameInput.removeAttribute('disabled');
    nameInput.value = `${name}`;
    colorInput.removeAttribute('disabled');
    colorInput.value = `${color}`;
    updateButton.removeAttribute('disabled');
    updateButton.dataset.carId = `${id}`;
  }

  public saveEditedCar(): void {
    const nameInput = document.querySelector('.car-update__name') as HTMLInputElement;
    const colorInput = document.querySelector('.car-update__color') as HTMLInputElement;
    const updateButton = document.querySelector('.car-update__button') as HTMLElement;

    nameInput.setAttribute('disabled', '');
    nameInput.value = '';
    colorInput.setAttribute('disabled', '');
    colorInput.value = COLOR.black;
    updateButton.setAttribute('disabled', '');
  }

  public async removeCar(id: string): Promise<void> {
    const carInGarage = document.querySelector(`.garage__car[data-car-id="${id}"]`) as HTMLElement;
    carInGarage.remove();
    const update = await this.appController.updateTotalCars(APP_TEXT_CONTENT.garage);
    update.headingElement.innerHTML = `${
      this.appView.createViewName(APP_TEXT_CONTENT.garage, update.totalCars).innerHTML
    }`;
  }

  private updateButtonsStatesDuringRace(id: number): void {
    const carContainer = document.querySelector(`.garage__car[data-car-id="${id}"]`) as HTMLElement;
    (carContainer.querySelector('.garage__car-start-engine-button') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (carContainer.querySelector('.garage__car-select-button') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (carContainer.querySelector('.garage__car-remove-button') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (document.querySelector('.car-creation__button') as HTMLElement).setAttribute('disabled', '');
    (document.querySelector('.controller-buttons__race') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (document.querySelector('.controller-buttons__generate-cars') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (document.querySelector('.garage__previous-page-button') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (document.querySelector('.garage__next-page-button') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
  }

  private updateButtonsStatesAfterStop(id: number): void {
    const carContainer = document.querySelector(`.garage__car[data-car-id="${id}"]`) as HTMLElement;
    (carContainer.querySelector('.garage__car-start-engine-button') as HTMLElement).removeAttribute(
      'disabled'
    );
    (carContainer.querySelector('.garage__car-stop-engine-button') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
    (carContainer.querySelector('.garage__car-select-button') as HTMLElement).removeAttribute(
      'disabled'
    );
    (carContainer.querySelector('.garage__car-remove-button') as HTMLElement).removeAttribute(
      'disabled'
    );
    (document.querySelector('.car-creation__button') as HTMLElement).removeAttribute('disabled');
    (document.querySelector('.controller-buttons__race') as HTMLElement).removeAttribute(
      'disabled'
    );
    (document.querySelector('.controller-buttons__generate-cars') as HTMLElement).removeAttribute(
      'disabled'
    );
    this.appController.enableNextButton(APP_TEXT_CONTENT.garage);
    this.appController.disableNextButton(APP_TEXT_CONTENT.garage);
    this.appController.enablePreviousButton(APP_TEXT_CONTENT.garage);
    this.appController.disablePreviousButton(APP_TEXT_CONTENT.garage);
  }

  public async activateStartCarButton(id: number): Promise<void> {
    const { velocity, distance } = (await this.api.engine.operateEngine(
      id,
      ENGINE_STATUS.started
    )) as IRaceParameters;
    const time: number = Math.round(distance / velocity);

    const carContainer = document.querySelector(`.garage__car[data-car-id="${id}"]`) as HTMLElement;
    const car = carContainer.querySelector('.garage__car-image') as HTMLElement;
    const flag = carContainer.querySelector('.garage__flag-image') as HTMLElement;
    const distanceBetween = Math.floor(this.animation.getDistanceBetweenElements(car, flag));
    const distanceBetweenPlusHalfCar = distanceBetween + Numbers.thirty;

    this.updateButtonsStatesDuringRace(id);

    this.animation.animateCar(car, distanceBetweenPlusHalfCar, time);

    const { success } = (await this.api.engine.operateEngine(
      id,
      ENGINE_STATUS.drive
    )) as EngineStatus;
    if (!success) {
      window.cancelAnimationFrame(+store.animationId[id]);
    }

    (carContainer.querySelector('.garage__car-stop-engine-button') as HTMLElement).removeAttribute(
      'disabled'
    );
  }

  public async activateStopCarButton(id: number): Promise<void> {
    await this.api.engine.operateEngine(id, ENGINE_STATUS.stopped);

    const carContainer = document.querySelector(`.garage__car[data-car-id="${id}"]`) as HTMLElement;
    const car = carContainer.querySelector('.garage__car-image') as HTMLElement;
    car.style.transform = `translateX(${Numbers.zero})`;

    this.updateButtonsStatesAfterStop(id);
  }

  public async activateRaceButton(): Promise<Store> {
    const pageHeader = (document.querySelector('.garage__page-number') as HTMLElement)
      .textContent as string;
    const carsOnPage = await this.api.garage.getCars(+pageHeader.split(COLOR.hash)[Numbers.one]);
    await Promise.all(
      carsOnPage.data.map(async (car: ICar): Promise<void> => {
        const { velocity, distance } = (await this.api.engine.operateEngine(
          car.id,
          ENGINE_STATUS.started
        )) as IRaceParameters;
        const time: number = Math.round(distance / velocity);
        const carContainer = document.querySelector(
          `.garage__car[data-car-id="${car.id}"]`
        ) as HTMLElement;
        const currentCar = carContainer.querySelector('.garage__car-image') as HTMLElement;
        const flag = carContainer.querySelector('.garage__flag-image') as HTMLElement;
        const distanceBetween = Math.floor(
          this.animation.getDistanceBetweenElements(currentCar, flag)
        );
        const distanceBetweenPlusHalfCar = distanceBetween + Numbers.thirty;
        this.updateButtonsStatesDuringRace(car.id);
        this.animation.animateCar(currentCar, distanceBetweenPlusHalfCar, time);
        const { success } = (await this.api.engine.operateEngine(
          car.id,
          ENGINE_STATUS.drive
        )) as EngineStatus;
        if (!success) {
          window.cancelAnimationFrame(+store.animationId[car.id]);
        }
        if (success && !store.hasWinner) {
          store.winner = await this.api.garage.getCar(car.id);
          store.hasWinner = true;
          store.winnerTime += time;
        }
      })
    );
    const resetButton = document.querySelector('.controller-buttons__reset') as HTMLElement;
    resetButton.removeAttribute('disabled');
    return store;
  }

  public async activateResetButton(): Promise<void> {
    const pageHeader = (document.querySelector('.garage__page-number') as HTMLElement)
      .textContent as string;
    const currentPage: number = +pageHeader.split(COLOR.hash)[Numbers.one];
    const carsOnPage = await this.api.garage.getCars(currentPage);

    carsOnPage.data.forEach(async (car: ICar): Promise<void> => {
      await this.api.engine.operateEngine(car.id, ENGINE_STATUS.stopped);
      const carContainer = document.querySelector(
        `.garage__car[data-car-id="${car.id}"]`
      ) as HTMLElement;
      const currentCar = carContainer.querySelector('.garage__car-image') as HTMLElement;
      currentCar.style.transform = `translateX(${Numbers.zero})`;
      this.updateButtonsStatesAfterStop(car.id);
    });
    (document.querySelector('.controller-buttons__reset') as HTMLElement).setAttribute(
      'disabled',
      ''
    );
  }
}
