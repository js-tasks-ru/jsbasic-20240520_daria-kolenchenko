import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.container = this.createCarousel();
  }

  createCarousel() {
    let carousel = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
       <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
       <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      </div>

    </div>
    `);

    this.slides.map(slide => this.createEntry(slide))
      .forEach(slide => carousel.querySelector('.carousel__inner').append(slide));

    const left = carousel.querySelector('.carousel__arrow_left');
    const right = carousel.querySelector('.carousel__arrow_right');

    let position = 0;
    left.style.display = 'none';

    right.addEventListener('click', () => {

      const width = carousel.querySelector('.carousel__slide').offsetWidth;
      const inner = carousel.querySelector('.carousel__inner');

      position -= width;
      if (position > -width * this.slides.length) {
        left.style.display = '';
        inner.style.transform = `translateX(${position}px)`;
        (position === -width * (this.slides.length - 1)) ? right.style.display = 'none' : right.style.display = '';
        return;
      }
      position = -width * this.slides.length;
    });

    left.addEventListener('click', () => {

      const width = carousel.querySelector('.carousel__slide').offsetWidth;
      const inner = carousel.querySelector('.carousel__inner');

      position += width;
      if (position <= 0) {
        right.style.display = '';
        inner.style.transform = `translateX(${position}px)`;
        (position === 0) ? left.style.display = 'none' : left.style.display = '';
        return;
      }
      position = 0;
    });

    return carousel;
  }

  createEntry(slide) {
    const picture = createElement(`
      <div class="carousel__slide" data-id="penang-shrimp">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
     <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
       <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
     </div>
    </div>
    `);

    picture.querySelector('.carousel__button').onclick = () => {
      picture.dispatchEvent(new CustomEvent("product-add", {
        detail: slide.id,
        bubbles: true
      }))
    }

    return picture;
  }


  get elem() {
    return this.container;
  }
}
