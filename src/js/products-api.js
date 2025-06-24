// Функції для роботи з бекендом

import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export async function getCategories() {
  const ENDPOINT = '/products/categories';
  const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
  return response.data;
}

export async function getProducts(currentPage = 1) {
  const ENDPOINT = `/products?limit=12&skip=${(currentPage - 1) * 12}`;
  const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
  return response.data;
}

export async function getCategoryProducts(categoryId, page = 1) {
  const skip = (page - 1) * 12;
  const ENDPOINT = `/products/category/${categoryId}?limit=12&skip=${skip}`;
  const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
  return response.data;
}

export async function getOneProduct(id) {
  const ENDPOINT = `/products/${id}`;
  const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
  return response.data;
}
