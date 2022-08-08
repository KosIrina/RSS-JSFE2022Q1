import API from '../../../api';
import CommonController from '../../common/controller/common';
import CommonView from '../../common/view/common';
import { COLOR, APP_TEXT_CONTENT } from '../../../constants';

export default class GarageController {
  readonly api: API;

  readonly appController: CommonController;

  readonly appView: CommonView;

  constructor() {
    this.api = new API();
    this.appController = new CommonController();
    this.appView = new CommonView();
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
}
