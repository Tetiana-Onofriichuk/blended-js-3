import"./assets/styles-CQAwvkEU.js";import{a as u,i as l}from"./assets/vendor-B3Dcf2UE.js";const p="https://dummyjson.com";async function $(){return(await u.get(`${p}/products/categories`)).data}async function m(o=1){const t=`/products?limit=12&skip=${(o-1)*12}`;return(await u.get(`${p}${t}`)).data}async function b(o,t=1){const e=(t-1)*12,s=`/products/category/${o}?limit=12&skip=${e}`;return(await u.get(`${p}${s}`)).data}async function h(o){const t=`/products/${o}`;return(await u.get(`${p}${t}`)).data}const n={categories:document.querySelector(".categories"),products:document.querySelector(".products"),loadMoreBtn:document.querySelector(".button-more")};function L(o){return o.map(({slug:t,name:e})=>`
          <li class="categories_item" data-id="${t}">
           
           <button class="categories__btn">${e}</button>

          </li>
        `).join("")}function M(o){document.querySelector(".categories").insertAdjacentHTML("beforeend",L(o))}function _(o){return o.map(({id:t,title:e,description:s,brand:r,category:a,images:i,price:c})=>`<li class="products__item" data-id="${t}">
        <img class="products__image" src="${i[0]}" alt="${s}" />
        <p class="products__title">${e}</p>
        <p class="products__brand">
          <span class="products__brand--bold">Brand: ${r}</span>
        </p>
        <p class="products__category">Category: ${a} </p>
        <p class="products__price">Price: ${c} $</p>
      </li>`).join("")}function y(o){const t=document.querySelector(".products");t.innerHTML="",t.insertAdjacentHTML("beforeend",_(o))}function P(){buttonMore.classList.add("hiddenbtn")}function B(o){document.querySelector(".products").insertAdjacentHTML("beforeend",_(o))}function w(o){const{title:t,description:e,brand:s,category:r,images:a,price:i,tags:c}=o,d=c.map(f=>`<li class="modal-product__tag-item">#${f}</li>`).join("");return`
    <img class="modal-product__img" src="${a[0]}" alt="${t}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${t}</p>
      <ul class="modal-product__tags">${d}</ul>
      <p class="modal-product__description">${e}</p>
      <p class="modal-product__shipping-information">Brand: ${s}</p>
      <p class="modal-product__return-policy">Return Policy: 30 days</p>
      <p class="modal-product__price">Price: ${i}$</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `}function S(o){const t=document.querySelector(".modal");if(!t){console.error("❌ Модалка не знайдена в DOM!");return}t.innerHTML=w(o),t.classList.add("modal--is-open")}n.categories.addEventListener("click",v);n.loadMoreBtn.addEventListener("click",E);n.products.addEventListener("click",I);let g=1;async function T(){try{const t=await $();M(t)}catch{l.error({message:"Сталася помилка при запиті!",position:"topRight"})}}T();async function q(o=1){try{const e=(await m(o)).products;y(e)}catch(t){console.log("❌ Помилка при отриманні продуктів:",t)}}q();async function v(o){const e=o.target.closest(".categories__btn");if(!e)return;const s=e.closest(".categories_item");if(!s)return;const r=s.dataset.id;console.log("Вибрана категорія:",r),document.querySelectorAll(".categories__btn").forEach(c=>c.classList.remove("categories__btn--active")),e.classList.add("categories__btn--active"),g=1,i();async function i(){try{const d=(await b(r)).products;y(d),d.length>=12?n.loadMoreBtn.classList.remove("hiddenbtn"):n.loadMoreBtn.classList.add("hiddenbtn")}catch(c){console.log("❌ Помилка при отриманні продуктів:",c)}}}async function E(){g+=1,n.loadMoreBtn.disabled=!0;try{const t=(await m(g)).products;B(t),t.length<12&&(P(),l.info({message:"Усі результати завантажено.",position:"bottomCenter",timeout:3e3}));const s=document.querySelector(".products").getBoundingClientRect().height;window.scrollBy({left:0,top:s*3,behavior:"smooth"})}catch{l.error({message:"Помилка при завантаженні додаткових зображень",position:"topRight"})}finally{n.loadMoreBtn.disabled=!1}}async function I(o){const t=o.target.closest(".products__item");if(!t)return;const e=t.dataset.id;console.log("🆔 ID продукту:",e);try{const r=await h(e);document.querySelector(".modal").classList.add("modal--is-open"),S(r)}catch(s){console.log("❌ Помилка при отриманні продукту по ID:",s),l.error({message:"Сталася помилка при запиті!",position:"topRight"})}}
//# sourceMappingURL=index.js.map
