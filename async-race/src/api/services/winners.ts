import {
  BASE_LINK,
  PAGE_URL,
  TOTAL_COUNT_HEADER,
  WINNERS_ORDER,
  WINNERS_SORT,
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
    sort: string = WINNERS_SORT.byId,
    order: string = WINNERS_ORDER.ascending,
    limit = CarsPerPage.ten
  ): Promise<IWinnersData> {
    const response = await fetch(
      `${BASE_LINK}/${PAGE_URL.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );
    const data: WinningCars = await response.json();
    const fullData: WinningCarsFullInfo = await Promise.all(
      data.map(async (item: IWinner) => ({ ...item, ...(await this.garage.getCar(item.id)) }))
    );
    const winnersTotal = response.headers.get(TOTAL_COUNT_HEADER) as string;
    return {
      fullData,
      winnersTotal,
    };
  }

  public async getWinner(id: number) {
    const response = await fetch(`${BASE_LINK}/${PAGE_URL.winners}/${id}`);
    const data: IWinner = await response.json();
    return data;
  }

  public async createWinner(parameters: IWinner): Promise<IWinner> {
    const response = await fetch(`${BASE_LINK}/${PAGE_URL.winners}`, {
      method: HTTP_METHOD.post,
      body: JSON.stringify(parameters),
      headers: HTTP_HEADER.content,
    });
    const data: IWinner = await response.json();
    return data;
  }

  public async deleteWinner(id: number): Promise<Record<string, never>> {
    const response = await fetch(`${BASE_LINK}/${PAGE_URL.winners}/${id}`, {
      method: HTTP_METHOD.delete,
    });
    const data: Record<string, never> = await response.json();
    return data;
  }

  public async updateWinner(id: number, parameters: IWinnerParameters): Promise<IWinner> {
    const response = await fetch(`${BASE_LINK}/${PAGE_URL.winners}/${id}`, {
      method: HTTP_METHOD.put,
      body: JSON.stringify(parameters),
      headers: HTTP_HEADER.content,
    });
    const data: IWinner = await response.json();
    return data;
  }

  public async getWinnerStatus(id: number): Promise<number> {
    const response = await fetch(`${BASE_LINK}/${PAGE_URL.winners}/${id}`);
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
