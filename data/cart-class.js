class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();

  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  }
  clearLocalStorage(item) {
    localStorage.removeItem(item);
  }
  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    
    const quantity = Number(quantitySelector.value);


    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }
  addToCartOnlyOne(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }
  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    
    this.cartItems = newCart;
    this.saveToStorage();
  }
  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }
  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
  // updateCartQuantity() {
  //   let cartQuantity = 0;
  //   cart.cartItems.forEach((cartItem) => {
  //     cartQuantity += cartItem.quantity;
  //   });
  //   document.querySelector('.js-cart-quantity')
  //     .innerHTML = cartQuantity;
  // }
  emptyCart() {
    this.cartItems = [];
    this.saveToStorage();
  }
};


export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
