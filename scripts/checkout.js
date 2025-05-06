import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/car.js'


async function loadPage() {

  try {
    await loadProductsFetch()
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();



