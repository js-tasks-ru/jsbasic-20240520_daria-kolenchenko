import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._container = this.createElem();
  }

  createElem(){
    let elem = createElement(`
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

    for (let i = 0; i < this.steps - 1; i++){
      elem.querySelector('.slider__steps').append(this.createSpan());
    }

    elem.addEventListener('click', (event) => {

      let left = event.clientX - elem.getBoundingClientRect().left;
      let leftRelative = left / elem.offsetWidth;
      let approximateValue = leftRelative * (this.steps - 1);
      let item = Math.round(approximateValue);
      let valuePercents = item / (this.steps - 1) * 100;
      this.value = item;

      let thumb = elem.querySelector('.slider__thumb');
      let thumbValue = elem.querySelector('.slider__value');
      let progress = elem.querySelector('.slider__progress');

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      thumbValue.innerHTML = this.value;

      elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }))
    })
    return elem;
  }

  createSpan(){
    return createElement(`<span></span>`);
  }

  get elem() {
    return this._container;
  }

}
