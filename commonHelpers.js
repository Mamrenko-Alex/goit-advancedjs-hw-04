import{a as v,S as L,_ as H}from"./assets/vendor-54fcd9b2.js";import d from"https://cdn.jsdelivr.net/npm/notiflix@3/+esm";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const a={success(r){d.Notify.success(r)},error(r){d.Notify.failure(r)},info(r){d.Notify.info(r)}},P="40858568-c2cbea82fefa532e5a07e25a9",c=40;async function p({querry:r,safesearch:s,page:t,perPage:n}){try{return(await v.get(`https://pixabay.com/api/?key=${P}&q=${r}&image_type=photo&orientation=horizontal&safesearch=${s}&page=${t}&per_page=${n}`)).data}catch{a.error("No response from the server, try again later")}}let m,f=1,y="",u;const h=document.querySelector(".search-form"),l={body:document.body,searchField:h.elements.searchQuery,safeSearchField:h.elements.safesearch,gallery:document.querySelector(".gallery")};function g(r){return r.map(({webformatURL:t,largeImageURL:n,tags:e,likes:o,views:i,comments:w,downloads:b})=>`
        <div class="photo-card">
            <a href="${n}" class="gallery__link">
                <img class="photo-img" src="${t}" alt="${e}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><span class="js-data">${o}</span>
                </p>
                <p class="info-item">
                    <b>Views</b><span class="js-data">${i}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b><span class="js-data">${w}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b><span class="js-data">${b}</span>
                </p>
            </div>
        </div>`).join("")}h.addEventListener("submit",q);async function q(r){r.preventDefault(),window.removeEventListener("scroll",u),f=1;const s={querry:l.searchField.value.trim().toLowerCase(),safesearch:l.safeSearchField.checked,perPage:c,page:f};if(s.querry===""){a.info("The search field must not be empty");return}else if(s.querry===y){a.info("Looks like you were just looking for this.");return}y=s.querry;try{const t=await p(s);if(t.total===0){l.gallery.innerHTML="",a.info("Sorry, there are no images matching your search query. Please try again.");return}window.scrollTo(0,0),a.success(`Hooray! We found ${t.totalHits} images.`),l.gallery.innerHTML=g(t.hits),m=new L(".gallery a",{captionsData:"alt",captionDelay:250}),m.refresh(),l.searchField.value="",u=H.throttle($,500),console.log(t.totalHits>c),t.totalHits>c&&window.addEventListener("scroll",u)}catch(t){a.error(t)}}document.querySelectorAll('a[href^="#"').forEach(r=>{r.addEventListener("click",function(s){s.preventDefault();let t=this.getAttribute("href").substring(1);const n=document.getElementById(t),e=0,i=n.getBoundingClientRect().top-e;window.scrollBy({top:i,behavior:"smooth"})})});async function $(){const r=window.innerHeight,s=document.documentElement.scrollHeight,t=window.scrollY;if(s-(r+t)>=80)return;f+=1;const n={querry:y,safesearch:l.safeSearchField.checked,perPage:c,page:f};try{const e=await p(n);l.gallery.innerHTML+=g(e.hits),m.refresh();const o=Math.ceil(e.totalHits/c);f>=o&&(window.removeEventListener("scroll",u),a.info("Sorry, you have viewed all available images."))}catch(e){console.log(e),a.error("somthing is wrong")}finally{}}
//# sourceMappingURL=commonHelpers.js.map
