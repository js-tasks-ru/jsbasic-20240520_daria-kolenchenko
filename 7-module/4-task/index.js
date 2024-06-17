import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._container = this.createElem();
  }

  createElem() {
    let slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: 0%;"></div>
        <div class="slider__steps">
          <span class="slider__step-active"></span>
        </div>
      </div>
      `)

    for (let i = 0; i < this.steps - 1; i++) {
      slider.querySelector('.slider__steps').append(this.createSpan());
    }

    let thumb = slider.querySelector('.slider__thumb');
    let thumbValue = slider.querySelector('.slider__value');
    let progress = slider.querySelector('.slider__progress');

    slider.addEventListener('click', (event) => {
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let approximateValue = leftRelative * (this.steps - 1);
      let item = Math.round(approximateValue);
      let valuePercents = item / (this.steps - 1) * 100;
      thumbValue.textContent = item;
      this.value = item;

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      slider.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    })

    const onPointerdown = (event) => {
      slider.classList.add('slider_dragging');
      event.preventDefault();
    };
    slider.addEventListener('pointerdown', onPointerdown);


    const onPointermove = (event) => {
      let shift = event.clientX - slider.getBoundingClientRect().left;
      let percents = 100 * shift / slider.offsetWidth;

      if (percents < 0) percents = 0;
      if (percents > 100) percents = 100;

      thumb.style.left = `${percents}%`;
      progress.style.width = `${percents}%`;

      let approximateValue = percents * (this.steps - 1) / 100;
      let item = Math.round(approximateValue);
      this.value = item;
    };
    slider.addEventListener('pointermove', onPointermove);

    const onPointerup = (event) => {
      slider.classList.remove('slider_dragging');
      document.removeEventListener('pointerup', onPointerup);
      document.removeEventListener('pointermove', onPointermove);

      slider.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    };
    slider.addEventListener('pointerup', onPointerup);

    thumb.ondragstart = () => false;

    return slider;
  }

  createSpan() {
    return createElement(`<span></span>`);
  }

  get elem() {
    return this._container;
  }
}
