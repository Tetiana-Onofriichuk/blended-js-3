//Функцію для створення, рендеру або видалення розмітки
import { updateCartCounter } from './storage';

function createGallery(info) {
  return info
    .map(
      ({ slug, name }) => `
          <li class="categories_item" data-id="${slug}">
           
           <button class="categories__btn">${name}</button>

          </li>
        `
    )
    .join('');
}

export function renderGallery(info) {
  const categories = document.querySelector('.categories');
  categories.insertAdjacentHTML('beforeend', createGallery(info));
}

function createProducts(item) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  return item
    .map(({ id, title, description, brand, category, images, price }) => {
      const inCart = cart.includes(id);
      return `
        <li class="products__item" data-id="${id}">
          <img class="products__image" src="${
            images[0]
          }" alt="${description}" />
          <p class="products__title">${title}</p>
          <p class="products__brand">
            <span class="products__brand--bold">Brand: ${brand}</span>
          </p>
          <p class="products__category">Category: ${category}</p>
          <p class="products__price">Price: ${price} $</p>
          <button 
            class="add-cart-btn" 
            data-id="${id}" 
            data-add-cart>
            ${inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </li>
      `;
    })
    .join('');
}

export function renderProducts(item) {
  const products = document.querySelector('.products');
  products.innerHTML = ''; // 🧹 очищаємо попередні
  products.insertAdjacentHTML('beforeend', createProducts(item));
  addCartListeners(); // ⬅️ Додано
}

export function showLoadMoreButton() {
  refs.buttonMore.classList.remove('hiddenbtn');
}

export function hideLoadMoreButton() {
  refs.buttonMore.classList.add('hiddenbtn');
}

export function renderProductsAll(item) {
  const products = document.querySelector('.products');
  products.insertAdjacentHTML('beforeend', createProducts(item));
  addCartListeners(); // ⬅️ Додано
}

export function createProductModal(product) {
  const { title, description, brand, category, images, price, tags } = product;
  const tagsMarkup = Array.isArray(tags)
    ? tags.map(t => `<li>${t}</li>`).join('')
    : '';

  return `
    <div class="modal__content">
      <button class="modal__close-btn" type="button"></button>
      <div class="modal-product">
        <img class="modal-product__img" src="${images[0]}" alt="${title}" />
        <div class="modal-product__content">
          <p class="modal-product__title">${title}</p>
          <ul class="modal-product__tags">${tagsMarkup}</ul>
          <p class="modal-product__description">${description}</p>
          <p class="modal-product__shipping-information">${brand}</p>
          <p class="modal-product__return-policy">30 days</p>
          <p class="modal-product__price">Price: ${price} $</p>
          <div class="modal-product__actions">
            <button class="modal-product__btn modal-product__btn--wishlist" type="button">
              Add to Wishlist
            </button>
            <button class="modal-product__btn modal-product__btn--cart" type="button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function addCartListeners() {
  const buttons = document.querySelectorAll('[data-add-cart]');
  buttons.forEach(button => {
    button.addEventListener('click', async event => {
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

        event.currentTarget.textContent = cart.includes(productId)
          ? 'Remove from Cart'
          : 'Add to Cart';

        const counter = document.querySelector('[data-cart-count]');
        if (counter) counter.textContent = cart.length;
      } catch (error) {
        iziToast.error({
          message: 'Не вдалося оновити кошик',
          position: 'topRight',
        });
      }
    });
  });
}
