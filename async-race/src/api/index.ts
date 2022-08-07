import GarageAPI from './services/garage';
import EngineAPI from './services/engine';
import WinnersAPI from './services/winners';

export default class API {
  readonly garage: GarageAPI;

  readonly engine: EngineAPI;

  readonly winners: WinnersAPI;

  constructor() {
    this.garage = new GarageAPI();
    this.engine = new EngineAPI();
    this.winners = new WinnersAPI();
  }
}
