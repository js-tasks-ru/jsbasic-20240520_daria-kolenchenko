import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModal();
    this.#closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') this.close();
  });
  }

  get #closeButton() {
    return this.modal.querySelector('.modal__close');
  }

  get #modalTitle() {
    return this.modal.querySelector('.modal__title');
  }

  get #modalBody() {
    return this.modal.querySelector('.modal__body');
  }

  createModal(){
    return createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          </h3>
        </div>
          <div class="modal__body">
          </div>
      </div>
    </div>
    `);
  }

  setTitle(title) {
    this.#modalTitle.textContent = title;
  }

  setBody(modalBody){
    for (let elem of this.#modalBody.children) {
      elem.remove();
    }
    this.#modalBody.append(modalBody);
  }

  open(){
    document.body.classList.add('is-modal-open');
    document.body.append(this.modal);
  }

  close(){
    document.body.classList.remove('is-modal-open');
    this.modal.remove();
  }
}
