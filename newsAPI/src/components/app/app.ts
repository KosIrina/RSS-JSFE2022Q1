import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  readonly controller: AppController;
  readonly view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    (document.querySelector('.sources') as HTMLElement).addEventListener(
      'click',
      (event: Event): void =>
        this.controller.getNews(event, (data): void => this.view.drawNews(data))
    );
    this.controller.getSources((data): void => this.view.drawSources(data));
    this.controller.getInitialNews((data): void => this.view.drawNews(data));
    (document.querySelector('.sources__heading') as HTMLElement).addEventListener(
      'click',
      this.view.toggleMobileSources
    );
    (document.querySelector('.mobile-overlay') as HTMLElement).addEventListener(
      'click',
      this.view.closeMobileSources
    );
    (document.querySelector('.sources__list') as HTMLElement).addEventListener(
      'click',
      this.view.closeMobileSources
    );
    (document.querySelector('.sources__list') as HTMLElement).addEventListener(
      'click',
      this.view.scrollUp
    );
  }
}

export default App;
