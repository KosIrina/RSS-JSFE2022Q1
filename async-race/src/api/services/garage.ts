import {
  BASE_LINK,
  PAGE_URL,
  TOTAL_COUNT_HEADER,
  HTTP_METHOD,
  HTTP_HEADER,
  CarsPerPage,
} from '../../constants';
import { ICar, CarsInGarage, ICarsData, ICarParameters } from '../../types';

export default class GarageAPI {
  public async getCars(page: number, limit = CarsPerPage.seven): Promise<ICarsData> {
    const url = `${BASE_LINK}/${PAGE_URL.garage}?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    const data: CarsInGarage = await response.json();
    const carsTotal = response.headers.get(TOTAL_COUNT_HEADER) as string;
    return {
      data,
      carsTotal,
    };
  }

  public async getCar(id: number): Promise<ICar> {
    const url = `${BASE_LINK}/${PAGE_URL.garage}/${id}`;
    const response = await fetch(url);
    const data: ICar = await response.json();
    return data;
  }

  public async createCar(parameters: ICarParameters): Promise<ICar> {
    const url = `${BASE_LINK}/${PAGE_URL.garage}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.post,
      body: JSON.stringify(parameters),
      headers: HTTP_HEADER.content,
    });
    const data: ICar = await response.json();
    return data;
  }

  public async deleteCar(id: number): Promise<Record<string, never>> {
    const url = `${BASE_LINK}/${PAGE_URL.garage}/${id}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.delete,
    });
    const data: Record<string, never> = await response.json();
    return data;
  }

  public async updateCar(id: number, parameters: ICarParameters): Promise<ICar> {
    const url = `${BASE_LINK}/${PAGE_URL.garage}/${id}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.put,
      body: JSON.stringify(parameters),
      headers: HTTP_HEADER.content,
    });
    const data: ICar = await response.json();
    return data;
  }
}
