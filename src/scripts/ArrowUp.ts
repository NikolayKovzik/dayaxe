export default class ArrowUp {
  private arrowUpButton: HTMLElement;

  constructor() {
    this.arrowUpButton = document.querySelector('.footer__arrow-up');
    this.addEventListeners();
  }

  addEventListeners() {
    this.arrowUpButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }
}
