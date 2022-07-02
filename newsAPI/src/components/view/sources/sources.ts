import './sources.css';
import { AllSources, Source } from '../../../types/types';

class Sources {
    public draw(data: AllSources['sources']): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (<HTMLSpanElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            if (typeof item.id === 'string') {
                (<HTMLDivElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);
            } else {
                (<HTMLDivElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', 'no-id');
            }

            fragment.append(sourceClone);
        });

        (<HTMLDivElement>document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
