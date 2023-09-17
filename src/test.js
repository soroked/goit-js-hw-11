import axios from "axios";

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = "39437968-8994b31ccac94168d8d24ad3e";

// axios.defaults.baseURL = 'https://pixabay.com';
// axios.defaults.headers.common["x-api-key"] = "39437968-8994b31ccac94168d8d24ad3e";

const params = new URLSearchParams({
    key: API_KEY,
    q: 'cat',
    per_page: 40,
    page: 1,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

function fetchBreeds() {
  return axios.get(`${BASE_URL}?${params}`).then(res => {
    console.log(res);
    return res.data;
  });
}
    
fetchBreeds().then(console.log);
