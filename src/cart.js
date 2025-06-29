//Логіка сторінки Cart

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { updateCartCounter } from './js/storage';

import { getOneProduct } from './js/products-api';
import { renderProducts } from './js/render-function';

const cartIds = JSON.parse(localStorage.getItem('cart')) || [];
const notFoundBlock = document.querySelector('.not-found');
const productsList = document.querySelector('.products');
const countSpan = document.querySelector('[data-count]');
const priceSpan = document.querySelector('[data-price]');

async function loadCartProducts() {
  if (cartIds.length === 0) {
    notFoundBlock.style.display = 'block';
    return;
  }

  try {
    const productPromises = cartIds.map(id => getOneProduct(id));
    const products = await Promise.all(productPromises);

    renderProducts(products);

    const totalPrice = products.reduce((acc, p) => acc + p.price, 0);
    const totalCount = products.length;

    if (countSpan) countSpan.textContent = totalCount;
    if (priceSpan) priceSpan.textContent = `$${totalPrice}`;
    priceSpan.textContent = `$${totalPrice.toFixed(2)}`;
  } catch (error) {
    console.error('❌ Помилка при завантаженні товарів з кошика:', error);
  }
}

loadCartProducts();
updateCartCounter();
