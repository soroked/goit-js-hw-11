// 1. замінити картинки
// 2. PER_PAGE ?? як можна по іншому отримати доступ до per_page
// 3. де обробляти клас кнопки??

import { makeRequest } from "./js/pixabay-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
export const buttonMore = document.querySelector('.load-more');

let page = 1;
let query = '';

export async function loadMoreHandler() {
  page += 1;
  buttonMore.classList.add('is-hidden');

  const request = await makeRequest(page, query);
  render(request.hits, gallery);

  if (page === 13) {
    Notify.info("We're sorry, but you've reached the end of search results.")
  }
};

async function formHandler(e) {
  e.preventDefault();

  page = 1;
  query = e.currentTarget.searchQuery.value;

  const request = await makeRequest(page, query);

  if (!request.hits.length) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else {
    Notify.success(`Hooray! We found ${request.totalHits} images.`);
  }

  render(request.hits, gallery);
};

function render(arr, container) {
  const markup = arr.map(item => `<div class="photo-card">
    <img src="${item.webformatURL}" width="300" alt="${item.tags}" loading="lazy" />
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