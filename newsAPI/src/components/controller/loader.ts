import type { EndPoint, VoidCallback } from '../../types/types';
import { ResponseErrors } from '../../types/types';

class Loader {
    readonly baseLink: string;
    readonly options?: { [key: string]: string };
    constructor(baseLink: string, options?: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResponse<T>(
        { endpoint, options = {} }: { endpoint: EndPoint; options?: { [key: string]: string } },
        callback: VoidCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === ResponseErrors.apiKeyMissing || response.status === ResponseErrors.notFound)
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            throw Error(response.statusText);
        }
        return response;
    }

    private makeUrl(endpoint: EndPoint, options?: { [key: string]: string }): string {
        const urlOptions: Partial<{ [key: string]: string }> = { ...this.options, ...options };
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
            .then((response: Response) => response.json())
            .then((data: T) => callback(data))
            .catch((error: Error) => console.error(error));
    }
}

export default Loader;
