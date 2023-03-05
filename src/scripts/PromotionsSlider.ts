export default class PromotionsSlider {
  private leftButton: HTMLButtonElement;

  private rightButton: HTMLButtonElement;

  private promotionsContainer: HTMLElement;

  private sliderBody: HTMLElement;

  private card: HTMLElement;

  private cardRatioRelativeToContainer: number;

  private cardWidth: number;

  private cardGap: number;

  private currentFirstCardOnTheLeft: number;

  private sliderCurrentPosition: number;

  private numberOfCards: number;

  private mqlLaptop: MediaQueryList;

  private mqlMobile: MediaQueryList;

  constructor() {
    this.leftButton = document.querySelector('.promotion-slider__button-left');
    this.rightButton = document.querySelector('.promotion-slider__button-right');
    this.promotionsContainer = document.querySelector('.promotions__container');
    this.sliderBody = document.querySelector('.promotion-slider__body');
    this.card = document.querySelector('.promotion-card');

    this.mqlLaptop = window.matchMedia('(min-width: 1024px)');
    this.mqlMobile = window.matchMedia('(min-width: 576px)');

    this.currentFirstCardOnTheLeft = 0;
    this.sliderCurrentPosition = 0;
    this.numberOfCards = 10;

    this.calcCardRatioToContainer();
    this.calcCardGap();
    this.toggleButtonsAvailability();

    this.init();
  }

  init() {
    this.mqlLaptop.addEventListener('change', () => {
      this.calcCardRatioToContainer();
      this.calcCardGap();
    });

    this.mqlMobile.addEventListener('change', () => {
      this.calcCardRatioToContainer();
      this.calcCardGap();
    });

    const ro = new ResizeObserver(entries => {
      document.body.setAttribute(
        'style',
        `--promotion-card-width: ${entries[0].contentRect.width * this.cardRatioRelativeToContainer}px`,
      );
    });

    ro.observe(this.promotionsContainer);

    this.rightButton.addEventListener('click', () => {
      this.moveSliderLeft();
      this.toggleButtonsAvailability();
    });
    this.leftButton.addEventListener('click', () => {
      this.moveSliderRight();
      this.toggleButtonsAvailability();
    });
  }

  calcCardRatioToContainer() {
    if (this.mqlLaptop.matches) {
      this.cardRatioRelativeToContainer = 0.315; // 356px / (1440 - 156 - 156)px
    } else if (this.mqlMobile.matches) {
      this.cardRatioRelativeToContainer = 0.476; // 328px / (768 - 40 - 40)px
    } else {
      this.cardRatioRelativeToContainer = 1; // 272px / (320 - 24 - 24)px
    }
  }

  calcCardGap() {
    if (this.mqlLaptop.matches) {
      this.cardGap = 30;
    } else {
      this.cardGap = 32;
    }
  }

  moveSliderLeft() {
    this.currentFirstCardOnTheLeft += 1;
    this.sliderCurrentPosition = this.sliderCurrentPosition - this.card.clientWidth - this.cardGap;
    // this.card.clientWidth * this.currentFirstCardOnTheLeft + this.cardGap * this.currentFirstCardOnTheLeft
    this.sliderBody.style.transform = `translateX(${this.sliderCurrentPosition}px)`;
  }

  moveSliderRight() {
    this.currentFirstCardOnTheLeft -= 1;
    // this.sliderBody.style.transform = `translateX(-${
    //   this.card.clientWidth * this.currentFirstCardOnTheLeft +
    //   this.cardGap * this.currentFirstCardOnTheLeft -
    //   this.card.clientWidth -
    //   this.cardGap
    // }px)`;
    this.sliderCurrentPosition = this.sliderCurrentPosition + this.card.clientWidth + this.cardGap;
    this.sliderBody.style.transform = `translateX(${this.sliderCurrentPosition}px)`;
  }

  toggleButtonsAvailability() {
    if (this.currentFirstCardOnTheLeft === 0) {
      this.leftButton.disabled = true;
    } else {
      this.leftButton.disabled = false;
    }

    if (this.currentFirstCardOnTheLeft === this.numberOfCards - 3) {
      this.rightButton.disabled = true;
    } else {
      this.rightButton.disabled = false;
    }
  }
}
