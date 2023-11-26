import{a as v,S as L,_ as P}from"./assets/vendor-54fcd9b2.js";import u from"https://cdn.jsdelivr.net/npm/notiflix@3/+esm";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const a={success(t){u.Notify.success(t)},error(t){u.Notify.failure(t)},info(t){u.Notify.info(t)}},q="40858568-c2cbea82fefa532e5a07e25a9",d=40;async function p({querry:t,safesearch:o,page:s,perPage:n}){try{return(await v.get(`https://pixabay.com/api/?key=${q}&q=${t}&image_type=photo&orientation=horizontal&safesearch=${o}&page=${s}&per_page=${n}`)).data}catch{a.error("No response from the server, try again later")}}let m,c=1,y="",f;const h=document.querySelector(".search-form"),l={body:document.body,searchField:h.elements.searchQuery,safeSearchField:h.elements.safesearch,gallery:document.querySelector(".gallery")};function g(t){return t.map(({webformatURL:s,largeImageURL:n,tags:e,likes:r,views:i,comments:w,downloads:b})=>`
        <div class="photo-card">
            <a href="${n}" class="gallery__link">
                <img class="photo-img" src="${s}" alt="${e}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><span class="js-data">${r}</span>
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
        </div>`).join("")}h.addEventListener("submit",$);async function $(t){t.preventDefault(),window.removeEventListener("scroll",f),c=1;const o={querry:l.searchField.value.trim().toLowerCase(),safesearch:l.safeSearchField.checked,perPage:d,page:c};if(o.querry===""){a.info("The search field must not be empty");return}else if(o.querry===y){a.info("Looks like you were just looking for this.");return}y=o.querry;try{const s=await p(o);if(s.total===0){l.gallery.innerHTML="",a.info("Sorry, there are no images matching your search query. Please try again.");return}window.scrollTo(0,0),a.success(`Hooray! We found ${s.totalHits} images.`),l.gallery.innerHTML=g(s.hits),m=new L(".gallery a",{captionsData:"alt",captionDelay:250}),m.refresh(),l.searchField.value=""}catch(s){a.error(s)}f=P.throttle(E,500),window.addEventListener("scroll",f)}document.querySelectorAll('a[href^="#"').forEach(t=>{t.addEventListener("click",function(o){o.preventDefault();let s=this.getAttribute("href").substring(1);const n=document.getElementById(s),e=0,i=n.getBoundingClientRect().top-e;window.scrollBy({top:i,behavior:"smooth"})})});async function E(){const t=window.innerHeight,o=document.documentElement.scrollHeight,s=window.scrollY;if(o-(t+s)>=80)return;c+=1;const n={querry:y,safesearch:l.safeSearchField.checked,perPage:d,page:c};try{const e=await p(n);l.gallery.innerHTML+=g(e.hits),m.refresh();const r=Math.ceil(e.totalHits/d);c>=r&&(window.removeEventListener("scroll",f),a.info("Sorry, you have viewed all available images."))}catch(e){console.log(e),a.error("somthing is wrong")}finally{}}
//# sourceMappingURL=commonHelpers.js.map
