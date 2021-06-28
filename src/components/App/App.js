import './App.css';
// import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import { Route, Switch, useLocation } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as moviesApi from '../../utils/MoviesApi';
import Api from '../../utils/MainApi';
import { useEffect, useState } from 'react';

function App() {
  // фильмы
  const [isSearching, setIsSearching] = useState(false);
  const [localStorageMovies, setLocalStorageMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(false);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4YzUyYzJhZDUwYzBiNDY3MTczOTAiLCJpYXQiOjE2MjQ4MTkwMDgsImV4cCI6MTYyNTQyMzgwOH0.ftQr6VHI86lOHdTMJ8JmevCb--Q-Fd9nHJwytyBXyvE')

  const [savedMovies, setSavedMovies] = useState([])
  const [localStorageSavedMovies, setLocalStorageSavedMovies] = useState([]);


  const api = new Api({
    url: "https://api.bukhgolts.nomoredomains.club",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
  
  const location = useLocation();


  useEffect(() => {
    localStorage.clear()
    setLocalStorageSavedMovies([])
    setSavedMovies([])
  }, [])

  useEffect(() => {
    setMoviesError(false);
    setSearchedMovies([])

    if (localStorageSavedMovies.length === 0) {
      api
        .getBookmarkedMovies()
          .then((bookmarkedMovies) => {
              setSavedMovies(bookmarkedMovies);
              localStorage.setItem('localStorageSavedMovies', JSON.stringify(bookmarkedMovies));
              const localMovies = JSON.parse(localStorage.getItem('localStorageSavedMovies'))
              setLocalStorageSavedMovies(localMovies);
              setSearchedMovies([])
          })
          .catch((err) => console.log(err))
    } else {
      // setSavedMovies(localStorageSavedMovies)
      setSearchedMovies([])
    }
  }, [location]);

  const handleMoviesSearch = (movies, searchQuery) => {
    const searchedMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (searchedMovies.length === 0) {
      setMoviesError('Ничего не найдено');
    }
    return searchedMovies;
  };
  
  const sortShortMovies = (movies) => {
    const shortMovies = movies.filter((movie) => movie.duration <= 40)
    return shortMovies
  }
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);
  const sortMoviesOnShortMoviesChecked = isShortMoviesChecked ? sortShortMovies(localStorageMovies) : localStorageMovies
  const sortSavedMoviesOnShortMoviesChecked = isShortMoviesChecked ? sortShortMovies(localStorageSavedMovies) : localStorageSavedMovies

  const handleSearchQuerySubmit = (searchQuery) => {
    setIsSearching(true);
    setMoviesError(false);
    setSearchedMovies([]);

    if (localStorageMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          const allMovies = JSON.parse(localStorage.getItem('movies'));
          setLocalStorageMovies(allMovies);
          const searchedMovies = handleMoviesSearch(sortMoviesOnShortMoviesChecked, searchQuery);
          setSearchedMovies(searchedMovies);
        })
        .catch((err) => {
          console.log(err);
          setMoviesError(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        })
        .finally(() => setIsSearching(false));
    } else {
      const searchedMovies = handleMoviesSearch(sortMoviesOnShortMoviesChecked, searchQuery);
      setSearchedMovies(searchedMovies);
      setIsSearching(false);
    }
  };

  const handleSavedMoviesSearchQuerySubmit = (searchQuery) => {
    setMoviesError(false);
    const searchedMovies = handleMoviesSearch(sortSavedMoviesOnShortMoviesChecked, searchQuery);
    setSavedMovies(searchedMovies);
  }

  const handleBookmarkMovieButtonClick = (movie) => {
    api
      .addMovie(movie)
        .then((addedMovie) => {
          setSavedMovies([...savedMovies, addedMovie])
          setLocalStorageSavedMovies([...localStorageSavedMovies, addedMovie])
        })
        .catch((err) => console.log(err))
  }

  const handleDeleteMovie = (movieId) => {
    api
      .deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => deletedMovie._id !== movieId)
        setSavedMovies(newSavedMovies)
        setLocalStorageSavedMovies(newSavedMovies)
      })
      .catch((err) => console.log(err))
  }


  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/movies">
          <Movies
            onSearchQuerySubmit={handleSearchQuerySubmit}
            isSearching={isSearching}
            movies={searchedMovies}
            moviesError={moviesError}
            onBookmarkMovieButtonClick={handleBookmarkMovieButtonClick}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            setIsShortMoviesChecked={setIsShortMoviesChecked}
          />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies 
            onSearchQuerySubmit={handleSavedMoviesSearchQuerySubmit}
            isSearching={isSearching}
            movies={savedMovies}
            moviesError={moviesError}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            setIsShortMoviesChecked={setIsShortMoviesChecked}
          />
        </Route>

        <Route path="/profile">
          <Profile userName="Виталий" email="pochta@yandex.ru" />
        </Route>

        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;