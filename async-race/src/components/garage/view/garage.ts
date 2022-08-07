import './garage.css';
import { APP_TEXT_CONTENT } from '../../../constants';
import CommonView from '../../common/view/common';
import WinnersView from '../../winners/view/winners';
import API from '../../../api';
import GarageController from '../controller/garage';
import WinnersController from '../../winners/controller/winners';
import carImage from '../../../assets/images/car.svg';
import flagImage from '../../../assets/images/flag.png';

export default class GarageView {
  readonly common: CommonView;

  readonly winners: WinnersView;

  readonly api: API;

  readonly garageController: GarageController;

  readonly winnersController: WinnersController;

  constructor() {
    this.common = new CommonView();
    this.winners = new WinnersView();
    this.api = new API();
    this.garageController = new GarageController();
    this.winnersController = new WinnersController();
  }

  private createInput(className: string, idName: string, inputType: string): HTMLElement {
    const input: HTMLElement = document.createElement('input');
    input.classList.add(className);
    input.setAttribute('id', idName);
    input.setAttribute('type', inputType);

    input.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    });

    return input;
  }

  private drawCarCreation(): HTMLElement {
    const carCreation: HTMLElement = document.createElement('form');
    carCreation.classList.add('garage__car-creation');

    const nameInput = this.createInput('car-creation__name', 'adding-car-name', 'text');
    const colorInput = this.createInput('car-creation__color', 'adding-car-color', 'color');
    const submitButton = this.common.createButton('car-creation__button', APP_TEXT_CONTENT.create);
    submitButton.setAttribute('type', 'button');

    carCreation.append(nameInput, colorInput, submitButton);
    return carCreation;
  }

  private drawCarUpdate(): HTMLElement {
    const carUpdate: HTMLElement = document.createElement('form');
    carUpdate.classList.add('garage__car-update');

    const nameInput = this.createInput('car-update__name', 'updating-car-name', 'text');
    nameInput.setAttribute('disabled', '');
    const colorInput = this.createInput('car-update__color', 'updating-car-color', 'color');
    colorInput.setAttribute('disabled', '');
    const submitButton = this.common.createButton('car-update__button', APP_TEXT_CONTENT.update);
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('disabled', '');

    carUpdate.append(nameInput, colorInput, submitButton);
    return carUpdate;
  }

  private drawMainControllerButtons(): HTMLElement {
    const garageControllerButtons: HTMLElement = document.createElement('div');
    garageControllerButtons.classList.add('garage__controller-buttons');

    const raceButton = this.common.createButton('controller-buttons__race', APP_TEXT_CONTENT.race);
    const resetButton = this.common.createButton(
      'controller-buttons__reset',
      APP_TEXT_CONTENT.reset
    );
    resetButton.setAttribute('disabled', '');
    const generateCarsButton = this.common.createButton(
      'controller-buttons__generate-cars',
      APP_TEXT_CONTENT.generateRandomCars
    );

    garageControllerButtons.append(raceButton, resetButton, generateCarsButton);
    return garageControllerButtons;
  }

  private drawGarageController(): HTMLElement {
    const garageController: HTMLElement = document.createElement('div');
    garageController.classList.add('garage__controller');

    const carCreation = this.drawCarCreation();
    const carUpdate = this.drawCarUpdate();
    const controllerButtons = this.drawMainControllerButtons();

    garageController.append(carCreation, carUpdate, controllerButtons);
    return garageController;
  }

  public drawMainGarage(): void {
    const garage = document.querySelector('.main__garage') as HTMLElement;
    const garageController = this.drawGarageController();
    const pagination = this.common.drawPagination(APP_TEXT_CONTENT.garage.toLowerCase());

    garage.append(garageController, pagination);
  }

  private createEditButtonsAndNameContainer(name: string): HTMLElement {
    const carEditButtonsAndName: HTMLElement = document.createElement('div');
    carEditButtonsAndName.classList.add('garage__car-edit-buttons-and-name');

    const selectButton = this.common.createButton(
      'garage__car-select-button',
      APP_TEXT_CONTENT.select
    );
    selectButton.addEventListener('click', async (event: Event): Promise<void> => {
      const button = event.target as HTMLElement;
      const car = button.closest('.garage__car') as HTMLElement;
      const carId = car.getAttribute('data-car-id') as string;
      const carInfo = await this.api.garage.getCar(+carId);
      this.garageController.editCar(carInfo.name, carInfo.color, carInfo.id);
    });

    const removeButton = this.common.createButton(
      'garage__car-remove-button',
      APP_TEXT_CONTENT.remove
    );
    removeButton.addEventListener('click', async (event: Event): Promise<void> => {
      const button = event.target as HTMLElement;
      const car = button.closest('.garage__car') as HTMLElement;
      const carId = car.getAttribute('data-car-id') as string;
      await this.api.garage.deleteCar(+carId);
      this.garageController.removeCar(carId);
      this.winnersController.removeCar(carId);
    });

    const carName: HTMLElement = document.createElement('span');
    carName.classList.add('garage__car-name');
    carName.textContent = `${name}`;

    carEditButtonsAndName.append(selectButton, removeButton, carName);
    return carEditButtonsAndName;
  }

  private createDriveButtonsAndCarContainer(color: string): HTMLElement {
    const driveButtonsAndCar: HTMLElement = document.createElement('div');
    driveButtonsAndCar.classList.add('garage__drive-buttons-and-car');

    const startEngineButton = this.common.createButton(
      'garage__car-start-engine-button',
      APP_TEXT_CONTENT.startEngine
    );
    const stopEngineButton = this.common.createButton(
      'garage__car-stop-engine-button',
      APP_TEXT_CONTENT.stopEngine
    );
    stopEngineButton.setAttribute('disabled', '');
    const carImageElement: HTMLElement = document.createElement('div');
    carImageElement.classList.add('garage__car-image');
    carImageElement.innerHTML = `<svg class="car-image" fill="${color}"><use xlink:href="${carImage}#car-image"></use></svg>`;
    const flagImageElement: HTMLElement = document.createElement('img');
    flagImageElement.classList.add('garage__flag-image');
    flagImageElement.setAttribute('src', flagImage);

    driveButtonsAndCar.append(
      startEngineButton,
      stopEngineButton,
      carImageElement,
      flagImageElement
    );
    return driveButtonsAndCar;
  }

  private createCarContainer(id: number, name: string, color: string): HTMLElement {
    const carContainer: HTMLElement = document.createElement('div');
    carContainer.classList.add('garage__car');
    carContainer.dataset.carId = `${id}`;

    const carEditButtonsAndName = this.createEditButtonsAndNameContainer(name);
    const driveButtonsAndCar = this.createDriveButtonsAndCarContainer(color);

    carContainer.append(carEditButtonsAndName, driveButtonsAndCar);
    return carContainer;
  }

  public async drawGarageContainer(page: number): Promise<void> {
    const garageContainer: HTMLElement = document.createElement('div');
    garageContainer.classList.add('garage__container');

    const garageController = document.querySelector('.garage__controller') as HTMLElement;
    const cars = await this.api.garage.getCars(page);
    const containerHeading = this.common.createViewName(APP_TEXT_CONTENT.garage, cars.carsTotal);
    const pageNumber = this.common.createPageNumber(APP_TEXT_CONTENT.garage, page);
    const carsContainer: HTMLElement = document.createElement('div');
    carsContainer.classList.add('garage__cars');

    cars.data.forEach((item) => {
      const car = this.createCarContainer(item.id, item.name, item.color);
      carsContainer.append(car);
    });

    garageContainer.append(containerHeading, pageNumber, carsContainer);
    garageController.after(garageContainer);
  }

  public async drawNewCar(dataId: number): Promise<void> {
    const carsContainer = document.querySelector('.garage__cars') as HTMLElement;
    const car = await this.api.garage.getCar(dataId);
    carsContainer.append(this.createCarContainer(car.id, car.name, car.color));
  }
}
