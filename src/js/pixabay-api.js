import axios from "axios";

const API_KEY = '39437968-8994b31ccac94168d8d24ad3e';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 40;

export function getPhotos(page, query) {

  const params = {
    key: API_KEY,
    q: query,
    per_page: PER_PAGE,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, {params});
};

