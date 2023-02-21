export default class HotelsSlider {
  private srcArr: string[];

  private hotelsListElement: HTMLElement;

  private buttonsListElement: HTMLElement;

  private hotelsCount: number;

  private buttonsCount: number;

  private currentSlideNumber: number;

  private currentSlideWidth: number;

  private mqlTablet: MediaQueryList;

  private mqlDesktop: MediaQueryList;

  constructor() {
    this.currentSlideNumber = 1;
    this.mqlTablet = window.matchMedia('(min-width: 768px)');
    this.mqlDesktop = window.matchMedia('(min-width: 1440px)');
    this.setSlideWidth();
    this.hotelsListElement = document.querySelector('.hotels__list');
    this.hotelsCount = this.hotelsListElement.childElementCount;
    this.setButtonsCount();
    this.buttonsListElement = document.querySelector('.hotels__pagination');
    this.init();
  }

  setSlideWidth() {
    if (this.mqlDesktop) {
      this.currentSlideWidth = 1128;
    } else if (this.mqlTablet) {
      this.currentSlideWidth = 688;
    } else {
      this.currentSlideWidth = 290;
    }
  }

  setButtonsCount() {
    const slideElementsCount = this.mqlTablet.matches ? 8 : 3;

    this.buttonsCount = Math.ceil(this.hotelsCount / slideElementsCount);
  }

  init() {
    this.generateSliderButtons();
    this.mqlTablet.addEventListener('change', () => {
      this.currentSlideNumber = 1;
      this.setButtonsCount();
      this.updateButtonsList();
      this.setSlideWidth();
    });
    this.mqlDesktop.addEventListener('change', () => {
      this.currentSlideNumber = 1;
      this.setButtonsCount();
      this.setSlideWidth();
    });
  }

  generateSliderButtons() {
    for (let i = 0; i < this.buttonsCount; i++) {
      const buttonElem = document.createElement('button');

      buttonElem.classList.add('hotels__pagination-bullet');

      buttonElem.dataset.slideNumber = `${i + 1}`;

      if (!i) {
        buttonElem.classList.add('hotels__pagination-bullet--active');
      }

      buttonElem.addEventListener('click', e => {
        this.changeActiveButton(e.currentTarget as HTMLElement);
        this.changeSlide(e);
      });

      this.buttonsListElement.insertAdjacentElement('beforeend', buttonElem);
    }
  }

  updateButtonsList() {
    while (this.buttonsListElement.firstChild) {
      this.buttonsListElement.removeChild(this.buttonsListElement.lastChild);
    }
    this.generateSliderButtons();
  }

  changeSlide(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;

    const slideNumber = +el.dataset.slideNumber;

    if (slideNumber > this.currentSlideNumber) {
      console.log(this.hotelsListElement.style.left);
      this.hotelsListElement.style.left = `${
        +this.hotelsListElement.style.left + (slideNumber - this.currentSlideNumber) * this.currentSlideWidth
      }px`;
    }

    if (slideNumber < this.currentSlideNumber) {
      console.log(this.hotelsListElement.style.left);
      this.hotelsListElement.style.left = `${
        +this.hotelsListElement.style.left - (slideNumber - this.currentSlideNumber) * this.currentSlideWidth
      }px`;
    }

    this.currentSlideNumber = slideNumber;
  }

  changeActiveButton(currentTarget: HTMLElement) {
    const { children } = this.buttonsListElement;

    for (let j = 0; j < children.length; j++) {
      const button = children[j];

      button.classList.remove('hotels__pagination-bullet--active');
    }
    currentTarget.classList.add('hotels__pagination-bullet--active');
  }
}
