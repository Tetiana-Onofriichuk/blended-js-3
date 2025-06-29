// modal.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import { createProductModal } from './render-function';
import { updateCartCounter, updateWishlistCounter } from './storage';

// НЕ потрібно: видаляємо глобальний слухач подій для modal
// refs.modal.addEventListener('click', clickAddCart);

export async function clickAddCart(event) {
  try {
    const productId = Number(event.currentTarget.dataset.id);
    if (!productId) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const isInCart = cart.includes(productId);

    if (isInCart) {
      cart = cart.filter(id => id !== productId);
    } else {
      cart.push(productId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Змінюємо текст кнопки відповідно до стану
    event.currentTarget.textContent = isInCart
      ? 'Add to Cart'
      : 'Remove from Cart';

    const counter = document.querySelector('[data-cart-count]');
    if (counter) counter.textContent = cart.length;
  } catch (error) {
    console.error('❌ Помилка при оновленні кошика:', error);
    iziToast.error({
      message: 'Не вдалося оновити кошик',
      position: 'topRight',
    });
  }
}

export async function clickAddWishList(event) {
  try {
    const productId = Number(event.currentTarget.dataset.id);
    if (!productId) return;

    let wishlist = JSON.parse(localStorage.getItem('wishList')) || [];

    const isInWishList = wishlist.includes(productId);

    if (isInWishList) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
    }

    // 🟢 Виправлено: правильне використання localStorage
    localStorage.setItem('wishList', JSON.stringify(wishlist));

    event.currentTarget.textContent = isInWishList
      ? 'Add to Wishlist'
      : 'Remove from Wishlist';

    const counter = document.querySelector('[data-wishlist-count]');
    if (counter) counter.textContent = wishlist.length;
  } catch (error) {
    console.error('❌ Помилка при оновленні wishlist:', error);
    iziToast.error({
      message: 'Не вдалося оновити wishlist',
      position: 'topRight',
    });
  }
}

export function renderModal(product) {
  const modal = document.querySelector('.modal');
  modal.innerHTML = createProductModal(product);
  modal.classList.remove('visually-hidden');
  modal.classList.add('modal--is-open');

  const addToCartBtn = modal.querySelector('.modal-product__btn--cart');
  const addToWishList = modal.querySelector('.modal-product__btn--wishlist');

  addToCartBtn.dataset.id = product.id;
  addToCartBtn.addEventListener('click', clickAddCart);

  addToWishList.dataset.id = product.id;
  addToWishList.addEventListener('click', clickAddWishList);

  const closeBtn = modal.querySelector('.modal__close-btn');
  closeBtn?.addEventListener('click', () => {
    modal.classList.add('visually-hidden');
    modal.classList.remove('modal--is-open');
    modal.innerHTML = '';
  });
}
updateCartCounter();
updateWishlistCounter();
