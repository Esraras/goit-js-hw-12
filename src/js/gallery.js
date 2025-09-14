import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.style.display = 'none';
loader.style.display = 'none';
let page = 1;
let perPage = 40;
let currentQuery = '';
let totalHits = 0;

async function fetchImages(query) {
  loader.style.display = 'block';
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '52281373-9c637a03bb3ab255d1364f6e9',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    const hits = response.data.hits;
    totalHits = response.data.totalHits;

    if (!hits || hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
      return;
    }

    const markup = hits
      .map(
        hit => `
          <div class="card">
            <a href="${hit.largeImageURL}">
              <img src="${hit.webformatURL}" alt="${hit.tags}"/>
            </a>
            <div class="card-info">
              <span><b>Likes</b>: ${hit.likes}</span>
              <span><b>Views</b>: ${hit.views}</span>
              <span><b>Comments</b>: ${hit.comments}</span>
              <span><b>Downloads</b>: ${hit.downloads}</span>
            </div>
          </div>
        `
      )
      .join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    const simple = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    simple.refresh();

    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  page = 1;
  currentQuery = form.querySelector('.search-input').value.trim();
  if (currentQuery) {
    fetchImages(currentQuery);
  }
});
loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchImages(currentQuery).then(() => {
    const card = document.querySelector('.card');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  });
});
