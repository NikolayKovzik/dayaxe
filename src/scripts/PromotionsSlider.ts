export default class PromotionsSlider {
  private leftButton: HTMLElement;

  private rightButton: HTMLElement;

  private promotionsContainer: HTMLElement;

  private cardRatioRelativeToContainer: number;

  constructor() {
    this.leftButton = document.querySelector('.promotion-slider__button-left');
    this.rightButton = document.querySelector('.promotion-slider__button-right');
    this.cardRatioRelativeToContainer = 0.315; // 356px / 1128px
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
    const ro = new ResizeObserver(entries => {
      document.body.setAttribute(
        'style',
        `--promotion-card-width: ${entries[0].contentRect.width * this.cardRatioRelativeToContainer}px`,
      );
    });

    ro.observe(this.promotionsContainer);
  }

  // eslint-disable-next-line class-methods-use-this
  updateCardWidth() {
    document.body.setAttribute('style', `--promotion-card-width: ${window.innerWidth / 4}px`);
  }
}
