export default class BurgerMenu {
  private hamburger: HTMLElement;

  private body: HTMLElement;

  private laptopMinWidth: MediaQueryList;

  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.body = document.querySelector('.body');
    this.laptopMinWidth = window.matchMedia('(min-width: 768px)');
    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.laptopMinWidth.addEventListener('change', laptopMinScreenSize => {
      if (laptopMinScreenSize.matches) {
        this.closeMenu();
      }
    });

    this.hamburger.addEventListener('click', event => {
      if ((event.currentTarget as HTMLElement).classList.contains('hamburger--open-menu')) {
        this.closeMenu();
      } else {
        this.addMenu();
      }
    });
  }

  addMenu() {
    this.hamburger.classList.add('hamburger--open-menu');
    this.body.classList.add('body--stop-scrolling');
  }

  closeMenu() {
    this.hamburger.classList.remove('hamburger--open-menu');
    this.body.classList.remove('body--stop-scrolling');
  }
}
