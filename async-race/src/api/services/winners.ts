import {
  BASE_LINK,
  PAGE_URL,
  TOTAL_COUNT_HEADER,
  ResponseCodes,
  Numbers,
  HTTP_METHOD,
  HTTP_HEADER,
  CarsPerPage,
} from '../../constants';
import {
  IWinner,
  WinningCars,
  IWinnersData,
  WinningCarsFullInfo,
  IWinnerParameters,
} from '../../types';
import GarageAPI from './garage';

export default class WinnersAPI {
  readonly garage: GarageAPI;

  constructor() {
    this.garage = new GarageAPI();
  }

  public async getWinners(
    page: number,
    sort = '',
    order = '',
    limit: number = CarsPerPage.ten
  ): Promise<IWinnersData> {
    const url = `${BASE_LINK}/${PAGE_URL.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response = await fetch(url);
    const data: WinningCars = await response.json();
    const fullData: WinningCarsFullInfo = await Promise.all(
      data.map(async (winner: IWinner) => ({ ...winner, ...(await this.garage.getCar(winner.id)) }))
    );
    const winnersTotal = response.headers.get(TOTAL_COUNT_HEADER) as string;
    return {
      fullData,
      winnersTotal,
    };
  }

  public async getWinner(id: number) {
    const url = `${BASE_LINK}/${PAGE_URL.winners}/${id}`;
    const response = await fetch(url);
    const data: IWinner = await response.json();
    return data;
  }

  public async createWinner(parameters: IWinner): Promise<IWinner> {
    const url = `${BASE_LINK}/${PAGE_URL.winners}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.post,
      body: JSON.stringify(parameters),
      headers: HTTP_HEADER.content,
    });
    const data: IWinner = await response.json();
    return data;
  }

  public async deleteWinner(id: number): Promise<Record<string, never>> {
    const url = `${BASE_LINK}/${PAGE_URL.winners}/${id}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.delete,
    });
    const data: Record<string, never> = await response.json();
    return data;
  }

  public async updateWinner(id: number, parameters: IWinnerParameters): Promise<IWinner> {
    const url = `${BASE_LINK}/${PAGE_URL.winners}/${id}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.put,
      body: JSON.stringify(parameters),
      headers: HTTP_HEADER.content,
    });
    const data: IWinner = await response.json();
    return data;
  }

  public async getWinnerStatus(id: number): Promise<number> {
    const url = `${BASE_LINK}/${PAGE_URL.winners}/${id}`;
    const response = await fetch(url);
    return response.status;
  }

  public async addWinnerInfo(id: number, time: number): Promise<void> {
    const winnerStatus = await this.getWinnerStatus(id);
    if (winnerStatus === ResponseCodes.NOT_FOUND) {
      await this.createWinner({ id, wins: Numbers.one, time });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        wins: winner.wins + Numbers.one,
        time: time < winner.time ? time : winner.time,
      });
    }
  }
}
