//Функцію для створення, рендеру або видалення розмітки

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
  return item
    .map(
      ({ id, title, description, brand, category, images, price }) =>
        `<li class="products__item" data-id="${id}">
        <img class="products__image" src="${images[0]}" alt="${description}" />
        <p class="products__title">${title}</p>
        <p class="products__brand">
          <span class="products__brand--bold">Brand: ${brand}</span>
        </p>
        <p class="products__category">Category: ${category} </p>
        <p class="products__price">Price: ${price} $</p>
      </li>`
    )
    .join('');
}

export function renderProducts(item) {
  const products = document.querySelector('.products');
  products.innerHTML = ''; // 🧹 очищаємо попередні
  products.insertAdjacentHTML('beforeend', createProducts(item));
}

export function showLoadMoreButton() {
  buttonMore.classList.remove('hiddenbtn');
}

export function hideLoadMoreButton() {
  buttonMore.classList.add('hiddenbtn');
}

export function renderProductsAll(item) {
  const products = document.querySelector('.products');

  products.insertAdjacentHTML('beforeend', createProducts(item));
}
function createProductModal(product) {
  const { title, description, brand, category, images, price, tags } = product;

  const tagsMarkup = tags
    .map(tag => `<li class="modal-product__tag-item">#${tag}</li>`)
    .join('');

  return `
    <img class="modal-product__img" src="${images[0]}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      <ul class="modal-product__tags">${tagsMarkup}</ul>
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Brand: ${brand}</p>
      <p class="modal-product__return-policy">Return Policy: 30 days</p>
      <p class="modal-product__price">Price: ${price}$</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;
}

export function renderModal(product) {
  const modal = document.querySelector('.modal'); // 🔄 правильний селектор

  if (!modal) {
    console.error('❌ Модалка не знайдена в DOM!');
    return;
  }

  modal.innerHTML = createProductModal(product);
  modal.classList.add('modal--is-open');
}
