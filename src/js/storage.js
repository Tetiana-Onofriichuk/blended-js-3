//Робота з loacalStorage

export function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const counter = document.querySelector('.nav__count');
  if (counter) counter.textContent = cart.length;
}

export function updateWishlistCounter() {
  const wishlist = JSON.parse(localStorage.getItem('wishList')) || [];
  const counter = document.querySelector('[data-wishlist-count]');
  if (counter) counter.textContent = wishlist.length;
}
