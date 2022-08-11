import { carBrands, carModels } from '../data/brands-and-models';
import { Numbers, COLOR } from '../constants';
import { ICarParameters } from '../types';

export default class RandomGenerator {
  private generateRandomCarName(): string {
    return `${carBrands[Math.floor(Math.random() * carBrands.length)]} ${
      carModels[Math.floor(Math.random() * carModels.length)]
    }`;
  }

  private generateRandomCarColor(): string {
    const possibleSymols = COLOR.possibleSymbols;
    let randomColor = COLOR.hash;
    for (let iteration = Numbers.zero; iteration < Numbers.six; iteration += Numbers.one) {
      randomColor += possibleSymols[Math.floor(Math.random() * possibleSymols.length)];
    }
    return randomColor;
  }

  public generateRandomCars(): ICarParameters[] {
    return new Array(Numbers.hundred).fill(Numbers.zero).map(
      (): ICarParameters => ({
        name: this.generateRandomCarName(),
        color: this.generateRandomCarColor(),
      })
    );
  }
}
