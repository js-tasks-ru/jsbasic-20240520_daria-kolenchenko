import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = {};
    let number = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === product.id) {
        this.cartItems[i].count++;
        number++;
        cartItem = Object.assign(cartItem, this.cartItems[i]);
      }
    }

    if (number === 0) {
      cartItem.product = Object.assign({}, product);
      cartItem.count = 1;
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = {};
    for (let i = 0; i < this. cartItems.length; i++){
      if (this.cartItems[i].product.id === productId) {
        this.cartItems[i].count += amount;
        cartItem = Object.assign(cartItem, this.cartItems[i]);
        if (cartItem.count === 0) {
          this.cartItems.splice(i, 1);
        }
      }
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return (this.cartItems.length === 0);
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + current.product.price * current.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();

    modal.setTitle('Your order');
    let modalBody = document.createElement('div');
    this.cartItems.forEach(cartItem => {
      const productElement = this.renderProduct(cartItem.product, cartItem.count);
      modalBody.append(productElement);
      productElement.querySelector('.cart-counter__button_minus').addEventListener('click', () => {
        this.updateProductCount(cartItem.product.id, -1);
        if (cartItem.count === 0) {
          productElement.remove();
        }
        if (this.cartItems.length === 0) {
          modal.close();
        }
      });
      productElement.querySelector('.cart-counter__button_plus').addEventListener('click', () => this.updateProductCount(cartItem.product.id, 1));
    });
    modalBody.append(this.renderOrderForm());
    modalBody.querySelector('.cart-form').addEventListener('submit', (event) => this.onSubmit(event));
    modal.setBody(modalBody);
    
    modal.open();

    this.modal = modal;
  }

  onProductUpdate(cartItem) {
    if (this.modal && document.body.classList.contains('is-modal-open') && cartItem.count !== 0) {
      const modal = this.modal.modalBody;
      let productCount = modal.querySelector(`[data-product-id |= "${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = modal.querySelector(`[data-product-id |="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = modal.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = `${cartItem.count}`;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    this.modal.modalBody.querySelector('button[type="submit"]').classList.add('is-loading');
    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.forms.cartForm)
    });
        this.cartItems = [];
        this.modal.setTitle('Success!');
        let newBody = createElement(`
          <div class="modal__body-inner">
            <p> Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
            </p>
          </div>
          `);
          this.modal.setBody(newBody);
          this.cartIcon.update(this);
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

