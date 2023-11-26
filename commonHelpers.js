import{a as L,S as $,_ as h}from"./assets/vendor-54fcd9b2.js";import u from"https://cdn.jsdelivr.net/npm/notiflix@3/+esm";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const n={success(t){u.Notify.success(t)},error(t){u.Notify.failure(t)},info(t){u.Notify.info(t)}},q="40858568-c2cbea82fefa532e5a07e25a9";let f=40;async function p({querry:t,safesearch:o,page:s,perPage:a}){try{return(await L.get(`https://pixabay.com/api/?key=${q}&q=${t}&image_type=photo&orientation=horizontal&safesearch=${o}&page=${s}&per_page=${a}`)).data}catch{n.error("No response from the server, try again later")}}let d,c=1,m="";const y=document.querySelector(".search-form"),i={body:document.body,searchField:y.elements.searchQuery,safeSearchField:y.elements.safesearch,galerry:document.querySelector(".gallery")};function g(t){return t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:l,comments:v,downloads:w})=>`
        <div class="photo-card">
            <a href="${a}" class="gallery__link">
                <img class="photo-img" src="${s}" alt="${e}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><span class="js-data">${r}</span>
                </p>
                <p class="info-item">
                    <b>Views</b><span class="js-data">${l}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b><span class="js-data">${v}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b><span class="js-data">${w}</span>
                </p>
            </div>
        </div>`).join("")}y.addEventListener("submit",H);async function H(t){t.preventDefault();const o={querry:i.searchField.value.trim().toLowerCase(),safesearch:i.safeSearchField.checked,perPege:f,page:c};if(o.querry===""){n.info("The search field must not be empty");return}else if(o.querry===m){n.info("Looks like you were just looking for this.");return}c=1,m=o.querry,console.log(o);try{await p(o).then(s=>{if(s.total===0){i.galerry.innerHTML="",n.info("Sorry, there are no images matching your search query. Please try again.");return}n.success(`Hooray! We found ${s.totalHits} images.`),i.galerry.innerHTML=g(s.hits),d=new $(".gallery a",{captionsData:"alt",captionDelay:250}),d.refresh()}),i.searchField.value=""}catch(s){n.error(s)}}document.addEventListener("scroll",h.throttle(b,500));async function b(){const t=window.innerHeight,o=document.documentElement.scrollHeight,s=window.scrollY;if(o-(t+s)<=90){c+=1;const a={querry:m,safesearch:i.safeSearchField.checked,perPege:f,page:c};console.log(a);try{await p(a).then(e=>{i.galerry.innerHTML+=g(e.hits),d.refresh();const r=Math.ceil(e.totalHits/f);c>=r&&(document.removeEventListener("scroll",h.throttle(b,500)),n.info("Sorry, you have viewed all available images."))})}catch{n.error("somthing is wrong")}finally{}}}
//# sourceMappingURL=commonHelpers.js.map
