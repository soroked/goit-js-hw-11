import axios from "axios";
// import { buttonMore, loadMoreHandler } from "../index.js";

const API_KEY = '39437968-8994b31ccac94168d8d24ad3e';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 40;

export function getPhotos(page, query) {

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    per_page: PER_PAGE,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const request = axios.get(`${BASE_URL}?${params}`);

  // buttonMore.classList.remove('is-hidden');

  // console.log(request.data.totalHits, PER_PAGE * page);
  
  // if (request.data.totalHits < PER_PAGE * page) {
  //   buttonMore.removeEventListener('click', loadMoreHandler);
  //   buttonMore.classList.add('is-hidden');
  // }
  
  return request;
};

