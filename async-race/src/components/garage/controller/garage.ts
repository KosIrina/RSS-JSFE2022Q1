import API from '../../../api';

export default class GarageController {
  readonly api: API;

  constructor() {
    this.api = new API();
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
    colorInput.value = '#000000';
    updateButton.setAttribute('disabled', '');
  }

  public removeCar(id: string): void {
    const carInGarage = document.querySelector(`.garage__car[data-car-id="${id}"]`) as HTMLElement;
    carInGarage.remove();
  }
}
