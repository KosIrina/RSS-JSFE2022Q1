import type { EndPoint, VoidCallback } from '../../types/types';
import { ResponseErrors } from '../../types/types';

class Loader {
    readonly baseLink: string;
    readonly options: { [key: string]: string };
    constructor(baseLink: string, options: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint, options = {} }: { endpoint: EndPoint; options?: { [key: string]: string } },
        callback: VoidCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseErrors.apiKeyMissing || res.status === ResponseErrors.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(endpoint: EndPoint, options?: { [key: string]: string }): string {
        let urlOptions: { [key: string]: string };
        if (options !== undefined) {
            urlOptions = { ...this.options, ...options };
        } else {
            urlOptions = { ...this.options };
        }
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: EndPoint,
        callback: VoidCallback<T>,
        options: { [key: string]: string } = {}
    ): void {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
