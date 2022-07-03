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
        (<HTMLDivElement>document.querySelector('.sources')).addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
        this.controller.getInitialNews((data) => this.view.drawNews(data));
    }
}

export default App;
