import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.container = this.createContainer();
  }

  createContainer() {
    const container = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>
      `);
    this.createProductItems(this.products).forEach(element => {
      container.querySelector('.products-grid__inner').append(element);
    });
    return container;
  }

  createProductItems(products) {
    return products.map(product => this.createProductItem(product));
  }

  createProductItem(product) {
    return createElement(`
      <div class="card">

    <div class="card__top">
     <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
     <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
     <div class="card__title">${product.name}</div>
     <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>

    </div>
  `);
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};

    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }
      if (this.filters.maxSpiciness < product.spiciness) {
        return false;
      }
      if (!!this.filters.category && this.filters.category != product.category) {
        return false;
      }
      return true;
    });
    this.container.querySelector('.products-grid__inner').replaceChildren(...this.createProductItems(filteredProducts));
  }

  get elem() {
    return this.container;
  }

}
