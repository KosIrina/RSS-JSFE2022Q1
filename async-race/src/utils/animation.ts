import { Numbers } from '../constants';
import store from '../store';
import { Store } from '../types';

export default class Animation {
  public getElementPosition(element: HTMLElement): { x: number } {
    const { left, width } = element.getBoundingClientRect();
    return { x: left + width / Numbers.two };
  }

  public getDistanceBetweenElements(car: HTMLElement, flag: HTMLElement): number {
    const carPosition = this.getElementPosition(car);
    const flagPosition = this.getElementPosition(flag);
    return flagPosition.x - carPosition.x;
  }

  public animateCar(car: HTMLElement, distance: number, animationTime: number): Store {
    let start = Numbers.zero;
    const carToAnimate = car;
    const carId = (carToAnimate.closest('.garage__car') as HTMLElement).getAttribute(
      'data-car-id'
    ) as string;

    function step(timestamp: number): void {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const progress = Math.round(time * (distance / animationTime));
      carToAnimate.style.transform = `translateX(${Math.min(progress, distance)}px)`;
      if (progress < distance) {
        store.animationId[carId] = window.requestAnimationFrame(step);
      }
    }
    store.animationId[carId] = window.requestAnimationFrame(step);
    return store;
  }
}
