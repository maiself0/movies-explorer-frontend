const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getBookmarkedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers
    }).then(onError)
  }

  addMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(onError);
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(onError);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(onError)
  };

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(onError)
      .then((token) => {
        if (token) {
          localStorage.setItem("jwt", token);
          return token;
        } else {
          return;
        }
      });
  };

  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`
        },
      }).then(onError);
    }

}
export default Api;
