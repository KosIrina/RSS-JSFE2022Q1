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
        (<HTMLDivElement>document.querySelector('.sources')).addEventListener('click', (event: Event) =>
            this.controller.getNews(event, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
        this.controller.getInitialNews((data) => this.view.drawNews(data));
        (<HTMLHeadingElement>document.querySelector('.sources__heading')).addEventListener(
            'click',
            this.view.toggleMobileSources
        );
        (<HTMLDivElement>document.querySelector('.mobile-overlay')).addEventListener(
            'click',
            this.view.closeMobileSources
        );
        (<HTMLDivElement>document.querySelector('.sources__list')).addEventListener(
            'click',
            this.view.closeMobileSources
        );
        (<HTMLDivElement>document.querySelector('.sources__list')).addEventListener('click', this.view.scrollUp);
    }
}

export default App;
