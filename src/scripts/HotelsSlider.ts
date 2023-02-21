export default class HotelsSlider {
  private srcArr: string[];

  private logosContainer: HTMLElement;

  private buttonsContainer: HTMLElement;

  private hotelsCount: number;

  private buttonsCount: number;

  constructor() {
    this.logosContainer = document.querySelector('.hotels__list');
    this.hotelsCount = this.logosContainer.childElementCount;
    this.buttonsCount = Math.ceil(this.hotelsCount / 3);
    this.buttonsContainer = document.querySelector('.hotels__pagination');
    this.init();
  }

  init() {
    this.generateSliderButtons();
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
}
