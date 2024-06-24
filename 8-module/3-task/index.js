export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
        this.cartItems[i].count = this.cartItems[i].count + amount;
        if(this.cartItems[i].count === 0){
          this.cartItems.splice(i, 1);
          return;
        }

        cartItem = Object.assign(cartItem, this.cartItems[i]);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

