

const API_KEY = '39437968-8994b31ccac94168d8d24ad3e';
const BASE_URL = 'https://pixabay.com/api/';

const options = {
    key: API_KEY,
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
};

fetch(`${BASE_URL}?key=${API_KEY}q=cat&page=1`).then(console.log);

console.log('asd');

