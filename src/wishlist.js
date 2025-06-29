//Логіка сторінки Wishlist
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getOneProduct } from './js/products-api';
import { renderProducts } from './js/render-function';
import { updateWishlistCounter } from './js/storage';
import { renderModal } from './js/modal';

const productsList = document.querySelector('.products');

productsList.addEventListener('click', onProductClick);

const wishlist = JSON.parse(localStorage.getItem('wishList')) || [];

async function onProductClick(event) {
  const card = event.target.closest('.products__item');
  if (!card) return;

  const productId = card.dataset.id;
  try {
    const product = await getOneProduct(productId);
    renderModal(product);
  } catch (error) {
    console.error('❌ Не вдалося завантажити продукт:', error);
  }
}

async function showWishlist() {
  const products = [];

  for (const id of wishlist) {
    const product = await getOneProduct(id); // імпортуй цю функцію
    products.push(product);
  }

  renderProducts(products);
}

showWishlist();

updateWishlistCounter();
