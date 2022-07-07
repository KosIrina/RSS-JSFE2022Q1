import Loader from './loader';
import { BASE_LINK, API_KEY } from '../../constants/constants';

class AppLoader extends Loader {
    constructor() {
        super(BASE_LINK, {
            apiKey: API_KEY,
        });
    }
}

export default AppLoader;
