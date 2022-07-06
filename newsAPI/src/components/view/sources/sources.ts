import './sources.css';
import { AllSources, Source } from '../../../types/types';

class Sources {
    public draw(data: AllSources['sources']): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemporary = document.querySelector('#sourceItemTemporary') as HTMLTemplateElement;

        data.forEach((item: Readonly<Source>) => {
            const sourceClone = sourceItemTemporary.content.cloneNode(true) as HTMLElement;

            (<HTMLSpanElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLDivElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (<HTMLDivElement>document.querySelector('.sources__list')).append(fragment);
    }
}

export default Sources;
