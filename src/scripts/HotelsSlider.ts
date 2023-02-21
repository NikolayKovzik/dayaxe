export default class HotelsSlider {
  private srcArr: string[];

  private logosContainer: HTMLElement;

  private buttonsContainer: HTMLElement;

  private hotelsCount: number;

  private buttonsCount: number;

  private mql: MediaQueryList;

  constructor() {
    this.mql = window.matchMedia('(min-width: 768px)');
    this.logosContainer = document.querySelector('.hotels__list');
    this.hotelsCount = this.logosContainer.childElementCount;
    this.setButtonsCount();
    this.buttonsContainer = document.querySelector('.hotels__pagination');
    this.init();
  }

  setButtonsCount() {
    const slideElementsCount = this.mql.matches ? 8 : 3;

    this.buttonsCount = Math.ceil(this.hotelsCount / slideElementsCount);
  }

  init() {
    this.generateSliderButtons();
    this.mql.addEventListener('change', () => this.updateButtonsList());
  }

  generateSliderButtons() {
    for (let i = 0; i < this.buttonsCount; i++) {
      const buttonElem = `
        <button class="hotels__pagination-bullet"></button>
      `;

      this.buttonsContainer.insertAdjacentHTML('beforeend', buttonElem);
    }
    this.buttonsContainer.firstElementChild?.classList.add('hotels__pagination-bullet--active');
  }

  updateButtonsList() {
    while (this.buttonsContainer.firstChild) {
      this.buttonsContainer.removeChild(this.buttonsContainer.lastChild);
    }
    this.setButtonsCount();
    this.generateSliderButtons();
  }
}
