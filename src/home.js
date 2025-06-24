//Логіка сторінки Home
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import {
  getCategories,
  getProducts,
  getCategoryProducts,
  getOneProduct,
} from './js/products-api';

import { refs } from './js/refs';

import {
  renderGallery,
  renderProducts,
  showLoadMoreButton,
  hideLoadMoreButton,
  renderProductsAll,
  renderModal,
} from './js/render-function';

refs.categories.addEventListener('click', handleClick);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);
refs.products.addEventListener('click', cardclick);

let currentPage = 1;
let currentCategory = null;

async function showCategories() {
  try {
    const response = await getCategories();
    const info = response;
    renderGallery(info);
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка при запиті!',
      position: 'topRight',
    });
  }
}
showCategories();

async function showProducts(page = 1) {
  try {
    const response = await getProducts(page);
    const items = response.products;
    renderProducts(items);
  } catch (error) {
    console.log('❌ Помилка при отриманні продуктів:', error);
  }
}

showProducts();

async function handleClick(event) {
  const target = event.target;

  const button = target.closest('.categories__btn');
  if (!button) return; // Клік не по кнопці — ігноруємо

  const li = button.closest('.categories_item'); // знаходимо найближчого предка
  if (!li) return;

  const categoryId = li.dataset.id;
  console.log('Вибрана категорія:', categoryId);

  const allButtons = document.querySelectorAll('.categories__btn');
  allButtons.forEach(btn => btn.classList.remove('categories__btn--active'));
  button.classList.add('categories__btn--active');

  currentCategory = categoryId; // 🟠 зберігаємо поточну категорію
  currentPage = 1; // 🟠 починаємо з першої сторінки

  showCategoriesProducts(categoryId); // ⬅️ ДОДАЙ ЦЕЙ ВИКЛИК

  async function showCategoriesProducts() {
    try {
      const response = await getCategoryProducts(categoryId);
      const items = response.products;
      renderProducts(items);
      if (items.length >= 12) {
        refs.loadMoreBtn.classList.remove('hiddenbtn');
      } else {
        refs.loadMoreBtn.classList.add('hiddenbtn');
      }
    } catch (error) {
      console.log('❌ Помилка при отриманні продуктів:', error);
    }
  }
}

async function handleLoadMore() {
  currentPage += 1;
  refs.loadMoreBtn.disabled = true;

  try {
    const response = await getProducts(currentPage); // ✅ виправлено
    const item = response.products;

    renderProductsAll(item);

    // Якщо завантажено менше ніж 12 – більше немає
    if (item.length < 12) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'Усі результати завантажено.',
        position: 'bottomCenter',
        timeout: 3000,
      });
    }

    // Прокрутка
    const card = document.querySelector('.products');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 3,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: 'Помилка при завантаженні додаткових зображень',
      position: 'topRight',
    });
  } finally {
    refs.loadMoreBtn.disabled = false;
  }
}

async function cardclick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return; // Клік не в картку — ігноруємо

  const productId = productItem.dataset.id;
  console.log('🆔 ID продукту:', productId);

  try {
    const response = await getOneProduct(productId); // 🟢 ПЕРЕДАЄМО productId, не "id"
    const product = response; // API повертає сам об'єкт, а не product.productId

    const modal = document.querySelector('.modal'); // 🟢 селектор без 'div.' — достатньо класу
    modal.classList.add('modal--is-open'); // 🟢 клас має бути рядком, не змінною

    renderModal(product); // 🟢 Передаємо дані, а не просто id
  } catch (error) {
    console.log('❌ Помилка при отриманні продукту по ID:', error);
    iziToast.error({
      message: 'Сталася помилка при запиті!',
      position: 'topRight',
    });
  }
}
