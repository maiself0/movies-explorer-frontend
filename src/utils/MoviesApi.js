const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export function getMovies() {
  return fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        new Error(`Ошибка ${res.status} - ${res.statusText}`)
      );
    }
  });
};