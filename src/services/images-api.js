const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24371745-e1c4a52fce1aadc8860478c5a";

function fetchImages(query, page) {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Ничего не найдено по данному запросу`));
  });
}

export default fetchImages;
