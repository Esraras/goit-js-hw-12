/* empty css                      */import{a as h,i as d,S as b}from"./assets/vendor-GN5hr8qZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const u=document.querySelector(".search-form"),f=document.querySelector(".gallery"),p=document.querySelector(".loader"),s=document.querySelector(".load-more-btn");s.style.display="none";p.style.display="none";let l=1,y=40,i="",m=0;async function g(o){p.style.display="block";try{const r=await h.get("https://pixabay.com/api/",{params:{key:"52281373-9c637a03bb3ab255d1364f6e9",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y,page:l}}),n=r.data.hits;if(m=r.data.totalHits,!n||n.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s.style.display="none";return}const a=n.map(e=>`
          <div class="card">
            <a href="${e.largeImageURL}">
              <img src="${e.webformatURL}" alt="${e.tags}"/>
            </a>
            <div class="card-info">
              <span><b>Likes</b>: ${e.likes}</span>
              <span><b>Views</b>: ${e.views}</span>
              <span><b>Comments</b>: ${e.comments}</span>
              <span><b>Downloads</b>: ${e.downloads}</span>
            </div>
          </div>
        `).join("");f.insertAdjacentHTML("beforeend",a),new b(".gallery a",{captionsData:"alt",captionDelay:250}).refresh(),l*y>=m?(s.style.display="none",d.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):s.style.display="block"}catch(r){console.error(r),d.error({title:"Error",message:"Something went wrong while fetching images.",position:"topRight"})}finally{p.style.display="none"}}u.addEventListener("submit",o=>{o.preventDefault(),f.innerHTML="",s.style.display="none",l=1,i=u.querySelector(".search-input").value.trim(),i&&g(i)});s.addEventListener("click",()=>{l+=1,g(i).then(()=>{const o=document.querySelector(".card");if(o){const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}})});
//# sourceMappingURL=index.js.map
