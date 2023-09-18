import { getPhotos, PER_PAGE } from "./js/pixabay-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formRef = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
export const buttonMore = document.querySelector('.load-more');

let page = 1;
let query = '';
let lightbox;

async function loadMoreHandler() {
  page += 1;
  buttonMore.classList.add('is-hidden');

  try {
    const request = await getPhotos(page, query);

    buttonMore.classList.remove('is-hidden');

    if (request.data.totalHits < PER_PAGE * page) {
      buttonMore.removeEventListener('click', loadMoreHandler);
      buttonMore.classList.add('is-hidden');
      if (request.data.totalHits) {
        Notify.info("We're sorry, but you've reached the end of search results.")
      } 
    }

    render(request.data.hits, gallery);
    lightbox.refresh();

  } catch (error) {
    console.log(error);
  }
};

async function formHandler(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  page = 1;
  query = e.currentTarget.searchQuery.value;

  if (query.trim()) {
    try {
      const request = await getPhotos(page, query);

      buttonMore.classList.remove('is-hidden');
      buttonMore.addEventListener('click', loadMoreHandler);

      if (request.data.totalHits < PER_PAGE * page) {
        buttonMore.removeEventListener('click', loadMoreHandler);
        buttonMore.classList.add('is-hidden');
        if (request.data.totalHits) {
          Notify.info("We're sorry, but you've reached the end of search results.")
        } 
      }

      if (!request.data.hits.length) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        Notify.success(`Hooray! We found ${request.data.totalHits} images.`);
      }

      render(request.data.hits, gallery);
      lightbox = new SimpleLightbox('.gallery a');

    } catch (error) {
      console.log(error);
    }  
  }
};

function render(arr, container) {
  const markup = arr.map(item => `<div class="photo-card">
    <a href="${item.largeImageURL}">
    <img src="${item.webformatURL}" width="300" alt="${item.tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${item.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${item.views} 
      </p>
      <p class="info-item">
        <b>Comments</b> ${item.comments} 
      </p>
      <p class="info-item">
        <b>Downloads</b> ${item.downloads}
      </p>
      </div>
  </div>`).join('');

  if (page === 1) {
    container.innerHTML = markup;
    return;
  }

  container.insertAdjacentHTML('beforeend', markup);

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
};

formRef.addEventListener('submit', formHandler);
buttonMore.addEventListener('click', loadMoreHandler);