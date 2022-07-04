import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '3ad45bd419fe429c98503ea78bac107c',
        });
    }
}

export default AppLoader;
