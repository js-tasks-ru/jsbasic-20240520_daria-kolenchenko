import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #container;

  constructor(categories) {
    this.categories = categories;
    this.#container = this.createElem();
  }

  createElem() {
    const element = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ibbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ${this.categories.map((category, index) => (index === 0) ? `<a href="#" class="ribbon__item ribbon__item_active" data-id="">${category.name}</a>` : this.createEntry(category))}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

    const right = element.querySelector('.ribbon__arrow_right');
    const left = element.querySelector('.ribbon__arrow_left');
    const ribbonInner = element.querySelector('.ribbon__inner');

    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    left.classList.remove('ribbon__arrow_visible');

    right.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
      ribbonInner.addEventListener('scroll', function () {
        if (scrollRight === 0) {
          right.classList.remove('ribbon__arrow_visible');
        }
        left.classList.add('ribbon__arrow_visible');
      })
    })

    left.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
      ribbonInner.addEventListener('scroll', function () {
        if (scrollLeft === 0) {
          left.classList.remove('ribbon__arrow_visible');
        }
        right.classList.add('ribbon__arrow_visible');
      })
    })

    element.querySelector('.ribbon__inner').onclick = (event) => {
      event.preventDefault();

      let a = event.target.closest('a');
      if (!a) return;
      if (!element.querySelector('.ribbon__inner').contains(a)) return;

      for (let elem of element.querySelectorAll('.ribbon__item')) {
        if (elem.classList.contains('ribbon__item_active')) {
          elem.classList.remove('ribbon__item_active');
          break;
        }
      }

      event.target.classList.add('ribbon__item_active');

      element.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      }));
    }
    return element;
  }

  createEntry(category) {
    return `<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`;
  }

  get elem() {
    return this.#container;
  }
}