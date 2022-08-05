export interface ICar {
  name: string;
  color: string;
  id: number;
}

export type CarsInGarage = ICar[];

export interface ICarsData {
  data: CarsInGarage;
  carsTotal: string;
}

export interface ICarParameters {
  name: string;
  color: string;
}

export interface IRaceParameters {
  velocity: number;
  distance: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type WinningCars = IWinner[];

export interface IWinnerFullInfo {
  id: number;
  wins: number;
  time: number;
  name: string;
  color: string;
}

export type WinningCarsFullInfo = IWinnerFullInfo[];

export interface IWinnersData {
  fullData: WinningCarsFullInfo;
  winnersTotal: string;
}

export interface IWinnerParameters {
  wins: number;
  time: number;
}
