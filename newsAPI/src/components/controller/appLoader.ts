import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'a4a0558513fe4a638309e3db3a74de68',
        });
    }
}

export default AppLoader;
