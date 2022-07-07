import './sources.css';
import { ISources, ISource } from '../../../types/types';

class Sources {
  public draw(data: ISources['sources']): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemporary = document.querySelector(
      '#sourceItemTemporary'
    ) as HTMLTemplateElement;

    data.forEach((item: Readonly<ISource>): void => {
      const sourceClone = sourceItemTemporary.content.cloneNode(true) as HTMLElement;

      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute(
        'data-source-id',
        item.id
      );

      fragment.append(sourceClone);
    });

    (document.querySelector('.sources__list') as HTMLElement).append(fragment);
  }
}

export default Sources;
