export default class PromotionsSlider {
  private leftButton: HTMLElement;

  private rightButton: HTMLElement;

  private promotionsContainer: HTMLElement;

  private cardRatioRelativeToContainer: number;

  private mqlLaptop: MediaQueryList;

  constructor() {
    this.leftButton = document.querySelector('.promotion-slider__button-left');
    this.rightButton = document.querySelector('.promotion-slider__button-right');
    this.mqlLaptop = window.matchMedia('(min-width: 1024px)');
    this.setCardRatioToContainer();
    this.promotionsContainer = document.querySelector('.promotions__container');

    this.init();
    this.updateCardWidth();
  }

  init() {
    // document.body.setAttribute('style', `--promotion-card-width: ${356}px`);
    // window.addEventListener(
    //   'resize',
    //   () => {
    //     this.updateCardWidth();
    //   },
    //   {
    //     passive: true,
    //   },
    // );
    this.mqlLaptop.addEventListener('change', () => {
      this.setCardRatioToContainer();
    });
    const ro = new ResizeObserver(entries => {
      document.body.setAttribute(
        'style',
        `--promotion-card-width: ${entries[0].contentRect.width * this.cardRatioRelativeToContainer}px`,
      );
    });

    ro.observe(this.promotionsContainer);
  }

  setCardRatioToContainer() {
    if (this.mqlLaptop.matches) {
      this.cardRatioRelativeToContainer = 0.315; // 356px / (1440 - 156 - 156)px
    } else {
      this.cardRatioRelativeToContainer = 0.476; // 328px / (768 - 40 - 40)px
    }
  }

  // eslint-disable-next-line class-methods-use-this
  updateCardWidth() {
    document.body.setAttribute('style', `--promotion-card-width: ${window.innerWidth / 4}px`);
  }
}
