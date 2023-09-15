// 1. замінити картинки
// 2. PER_PAGE ?? як можна по іншому отримати доступ до per_page
// 3. де обробляти клас кнопки??

const formRef = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonMore = document.querySelector('.load-more');

const API_KEY = '39437968-8994b31ccac94168d8d24ad3e';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

let page = 1;
let query = '';

const fetchQuery = (page, query) => {

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    per_page: PER_PAGE,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  
  return fetch(`${BASE_URL}?${params.toString()}`).then(res => {
    
    if (!res.ok) throw new Error(res.statusText);

    return res.json();
  }).then(res => {

    buttonMore.classList.remove('is-hidden');

    if (res.totalHits < PER_PAGE * page) {
      buttonMore.classList.add('is-hidden');
    }

    return res;
  })
};

function loadMoreHandler() {
  page += 1;
  buttonMore.classList.add('is-hidden');
  fetchQuery(page, query).then((res) => render(res.hits, gallery));
}

function render(arr, container) {
  const markup = arr.map(item => `<div class="photo-card">
    <img src="${item.previewURL}" alt="${item.tags}" loading="lazy" />
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
}

function formHandler(e) {
  e.preventDefault();

  page = 1;
  query = e.currentTarget.searchQuery.value;

  fetchQuery(page, query).then((res) => render(res.hits, gallery));
}

formRef.addEventListener('submit', formHandler);

buttonMore.addEventListener('click', loadMoreHandler);