import './common.css';
import { Numbers, APP_TEXT_CONTENT, ADDITIONAL_LINKS } from '../../../constants';

export default class CommonView {
  public drawBody(): void {
    const body = document.querySelector('body') as HTMLElement;
    body.classList.add('body');

    const header: HTMLElement = document.createElement('header');
    header.classList.add('header');
    body.append(header);

    const main: HTMLElement = document.createElement('main');
    main.classList.add('main');
    body.append(main);

    const footer: HTMLElement = document.createElement('footer');
    footer.classList.add('footer');
    body.append(footer);

    const winnerMessageContainer: HTMLElement = document.createElement('div');
    winnerMessageContainer.classList.add('winner-message');
    const winnerMessage: HTMLElement = document.createElement('p');
    winnerMessage.classList.add('winner-message__text');
    const closeWinnerMessage: HTMLElement = document.createElement('button');
    closeWinnerMessage.classList.add('winner-message__button');
    closeWinnerMessage.innerHTML = APP_TEXT_CONTENT.closeButton;
    winnerMessageContainer.append(winnerMessage, closeWinnerMessage);

    closeWinnerMessage.addEventListener('click', (): void => {
      winnerMessage.textContent = '';
      winnerMessageContainer.style.display = 'none';
    });

    body.append(winnerMessageContainer);
  }

  public drawHeader(): void {
    const header = document.querySelector('.header') as HTMLElement;

    const headerTitle: HTMLElement = document.createElement('h1');
    headerTitle.classList.add('header__logo');
    headerTitle.textContent = APP_TEXT_CONTENT.title;
    header.append(headerTitle);
  }

  public drawFooter(): void {
    const footer = document.querySelector('.footer') as HTMLElement;

    const footerGitHubLink: HTMLElement = document.createElement('a');
    footerGitHubLink.classList.add('footer__github-link');
    footerGitHubLink.setAttribute('href', ADDITIONAL_LINKS.githubLink);
    footerGitHubLink.textContent = APP_TEXT_CONTENT.githubAccount;

    const footerCopyright: HTMLElement = document.createElement('p');
    footerCopyright.classList.add('footer__copyright');
    footerCopyright.textContent = APP_TEXT_CONTENT.copyright;

    const footerRSSLink: HTMLElement = document.createElement('a');
    footerRSSLink.classList.add('footer__rss-link');
    footerRSSLink.setAttribute('href', ADDITIONAL_LINKS.rssLink);

    footer.append(footerGitHubLink, footerCopyright, footerRSSLink);
  }

  public createButton(className: string, text: string): HTMLElement {
    const button: HTMLElement = document.createElement('button');
    button.classList.add('button', className);
    button.textContent = text;
    return button;
  }

  private drawPageChangeButtons(): HTMLElement {
    const pageChangeButtons: HTMLElement = document.createElement('div');
    pageChangeButtons.classList.add('main__page-change');

    const garageButton = this.createButton('main__garage-button', APP_TEXT_CONTENT.garage);
    garageButton.setAttribute('disabled', '');
    const winnersButton = this.createButton('main__winners-button', APP_TEXT_CONTENT.winners);

    pageChangeButtons.append(garageButton, winnersButton);
    return pageChangeButtons;
  }

  public drawPagination(pageName: string): HTMLElement {
    const pagination: HTMLElement = document.createElement('div');
    pagination.classList.add(`${pageName}__page-number-change`);

    const previousPageButton = this.createButton(
      `${pageName}__previous-page-button`,
      APP_TEXT_CONTENT.previous
    );
    const nextPageButton = this.createButton(
      `${pageName}__next-page-button`,
      APP_TEXT_CONTENT.next
    );

    previousPageButton.setAttribute('disabled', '');
    nextPageButton.setAttribute('disabled', '');

    pagination.append(previousPageButton, nextPageButton);
    return pagination;
  }

  public drawMain(): void {
    const main = document.querySelector('.main') as HTMLElement;

    const garageContainer: HTMLElement = document.createElement('div');
    garageContainer.classList.add('main__garage');

    const winnersContainer: HTMLElement = document.createElement('div');
    winnersContainer.classList.add('main__winners');

    const pageChangeButtons = this.drawPageChangeButtons();

    main.append(pageChangeButtons, garageContainer, winnersContainer);
  }

  public createViewName(pageName: string, carsAmount: string): HTMLElement {
    const viewName: HTMLElement = document.createElement('h2');
    viewName.classList.add(`${pageName.toLowerCase()}__heading`);
    if (+carsAmount === Numbers.one) {
      viewName.textContent = `${pageName} (${carsAmount} car)`;
    } else {
      viewName.textContent = `${pageName} (${carsAmount} cars)`;
    }
    return viewName;
  }

  public createPageNumber(pageName: string, page: number): HTMLElement {
    const pageNumber: HTMLElement = document.createElement('p');
    pageNumber.classList.add(`${pageName.toLowerCase()}__page-number`);
    pageNumber.textContent = `${APP_TEXT_CONTENT.pageNumber}${page}`;
    return pageNumber;
  }
}
