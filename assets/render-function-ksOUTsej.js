import{a as d}from"./vendor-B3Dcf2UE.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const i="https://dummyjson.com";async function _(){return(await d.get(`${i}/products/categories`)).data}async function y(o=1){const t=`/products?limit=12&skip=${(o-1)*12}`;return(await d.get(`${i}${t}`)).data}async function b(o,t=1){const r=(t-1)*12,c=`/products/category/${o}?limit=12&skip=${r}`;return(await d.get(`${i}${c}`)).data}async function $(o){const t=`/products/${o}`;return(await d.get(`${i}${t}`)).data}async function h(o){const t=`/products/search?q=${encodeURIComponent(o)}`,r=await d.get(`${i}${t}`);return console.log("📦 API відповідь:",r.data),r.data}function N(){const o=JSON.parse(localStorage.getItem("cart"))||[],t=document.querySelector(".nav__count");t&&(t.textContent=o.length)}function P(){const o=JSON.parse(localStorage.getItem("wishList"))||[],t=document.querySelector("[data-wishlist-count]");t&&(t.textContent=o.length)}function g(o){return o.map(({slug:t,name:r})=>`
          <li class="categories_item" data-id="${t}">
           
           <button class="categories__btn">${r}</button>

          </li>
        `).join("")}function C(o){document.querySelector(".categories").insertAdjacentHTML("beforeend",g(o))}function p(o){const t=JSON.parse(localStorage.getItem("cart")||"[]");return o.map(({id:r,title:c,description:e,brand:s,category:n,images:a,price:u})=>{const l=t.includes(r);return`
        <li class="products__item" data-id="${r}">
          <img class="products__image" src="${a[0]}" alt="${e}" />
          <p class="products__title">${c}</p>
          <p class="products__brand">
            <span class="products__brand--bold">Brand: ${s}</span>
          </p>
          <p class="products__category">Category: ${n}</p>
          <p class="products__price">Price: ${u} $</p>
          <button 
            class="add-cart-btn" 
            data-id="${r}" 
            data-add-cart>
            ${l?"Remove from Cart":"Add to Cart"}
          </button>
        </li>
      `}).join("")}function S(o){const t=document.querySelector(".products");t.innerHTML="",t.insertAdjacentHTML("beforeend",p(o)),m()}function O(){refs.buttonMore.classList.add("hiddenbtn")}function I(o){document.querySelector(".products").insertAdjacentHTML("beforeend",p(o)),m()}function L(o){const{title:t,description:r,brand:c,category:e,images:s,price:n,tags:a}=o,u=Array.isArray(a)?a.map(l=>`<li>${l}</li>`).join(""):"";return`
    <div class="modal__content">
      <button class="modal__close-btn" type="button"></button>
      <div class="modal-product">
        <img class="modal-product__img" src="${s[0]}" alt="${t}" />
        <div class="modal-product__content">
          <p class="modal-product__title">${t}</p>
          <ul class="modal-product__tags">${u}</ul>
          <p class="modal-product__description">${r}</p>
          <p class="modal-product__shipping-information">${c}</p>
          <p class="modal-product__return-policy">30 days</p>
          <p class="modal-product__price">Price: ${n} $</p>
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
  `}function m(){document.querySelectorAll("[data-add-cart]").forEach(t=>{t.addEventListener("click",async r=>{try{const c=Number(r.currentTarget.dataset.id);if(!c)return;let e=JSON.parse(localStorage.getItem("cart"))||[];e.includes(c)?e=e.filter(a=>a!==c):e.push(c),localStorage.setItem("cart",JSON.stringify(e)),r.currentTarget.textContent=e.includes(c)?"Remove from Cart":"Add to Cart";const n=document.querySelector("[data-cart-count]");n&&(n.textContent=e.length)}catch{iziToast.error({message:"Не вдалося оновити кошик",position:"topRight"})}})})}export{b as a,y as b,I as c,h as d,_ as e,C as f,$ as g,O as h,N as i,L as j,S as r,P as u};
//# sourceMappingURL=render-function-ksOUTsej.js.map
