import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Main from '../Main/Main';
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as moviesApi from '../../utils/MoviesApi';
import Api from '../../utils/MainApi';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

function App() {
  // фильмы
  const [isSearching, setIsSearching] = useState(false);
  const [localStorageMovies, setLocalStorageMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [localStorageSavedMovies, setLocalStorageSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const api = new Api({
    url: 'https://api.bukhgolts.nomoredomains.club',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  const location = useLocation();

  const handleMoviesSearch = (movies, searchQuery) => {
    const searchedMovies = movies.filter((movie) => {
      return movie?.nameRU.toLowerCase().includes(searchQuery?.toLowerCase());
    });

    if (searchedMovies.length === 0) {
      setMoviesError('Ничего не найдено');
    }
    return searchedMovies;
  };

  const sortShortMovies = (movies) => {
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    return shortMovies;
  };
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  const sortMoviesOnShortMoviesChecked = isShortMoviesChecked
    ? sortShortMovies(localStorageMovies)
    : localStorageMovies;

  const sortSavedMoviesOnShortMoviesChecked = isShortMoviesChecked
    ? sortShortMovies(localStorageSavedMovies)
    : localStorageSavedMovies;

  const handleSearchQuerySubmit = (searchQuery) => {
    setIsSearching(true);
    setMoviesError(false);
    setSearchedMovies([]);

    if (localStorageMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          const sortApiMoviesOnShortMoviesChecked = isShortMoviesChecked
            ? sortShortMovies(movies)
            : movies;
          localStorage.setItem('movies', JSON.stringify(movies));
          const allMovies = JSON.parse(localStorage.getItem('movies'));
          setLocalStorageMovies(allMovies);
          const searchedMovies = handleMoviesSearch(
            sortApiMoviesOnShortMoviesChecked,
            searchQuery
          );
          localStorage.setItem(
            'localStorageSearchedMovies',
            JSON.stringify(searchedMovies)
          );
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
      const searchedMovies = handleMoviesSearch(
        sortMoviesOnShortMoviesChecked,
        searchQuery
      );
      localStorage.setItem(
        'localStorageSearchedMovies',
        JSON.stringify(searchedMovies)
      );
      setSearchedMovies(searchedMovies);
      setIsSearching(false);
    }
  };

  const handleSavedMoviesSearchQuerySubmit = (searchQuery) => {
    setMoviesError(false);
    const searchedMovies = handleMoviesSearch(
      sortSavedMoviesOnShortMoviesChecked,
      searchQuery
    );
    setSavedMovies(searchedMovies);
  };

  const handleBookmarkMovieButtonClick = (movie) => {
    api
      .addMovie(movie)
      .then((addedMovie) => {
        setSavedMovies([...savedMovies, addedMovie]);
        setLocalStorageSavedMovies([...localStorageSavedMovies, addedMovie]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movieId) => {
    api
      .deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (deletedMovie) => deletedMovie._id !== movieId
        );
        setSavedMovies(newSavedMovies);
        setLocalStorageSavedMovies(newSavedMovies);
      })
      .catch((err) => console.log(err));
  };

  const [apiResponse, setApiResponse] = useState('');
  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const history = useHistory();

  const handleRegister = ({ name, email, password }) => {
    setIsAuthChecking(true);
    api
      .register(name, email, password)
      .then((response) => {
        if (response) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setApiResponse('Что-то пошло не так');
        console.log(err);
      })
      .finally(() => setIsAuthChecking(false));
  };

  const handleLogin = (email, password) => {
    setIsAuthChecking(true);
    api
      .login(email, password)
      .then((data) => {
        setJwt(data);
        setApiResponse('');
        tokenCheck();
        history.push('/movies');
        localStorage.setItem('isAuth', true);
      })
      .catch((err) => {
        setApiResponse('Что-то пошло не так');
        localStorage.setItem('isAuth', false);
        console.log(err);
      })
      .finally(() => setIsAuthChecking(false));
  };

  const tokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthChecking(true);
      api
        .getUserData(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
            history.push(location.pathname);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsAuthChecking(false));
    }
  };

  useEffect(() => {
    tokenCheck();
    const allMovies = JSON.parse(localStorage.getItem('movies'));
    if (allMovies) {
      setLocalStorageMovies(allMovies);
    }

    const localMovies = JSON.parse(
      localStorage.getItem('localStorageSavedMovies')
    );
    if (localMovies) {
      setLocalStorageSavedMovies(localMovies);
    }

    const searchedMovies = JSON.parse(
      localStorage.getItem('localStorageSearchedMovies')
    );
    if (searchedMovies) {
      setSearchedMovies(searchedMovies);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && localStorageSavedMovies.length === 0) {
      api
        .getBookmarkedMovies()
        .then((bookmarkedMovies) => {
          setSavedMovies(bookmarkedMovies);
          localStorage.setItem(
            'localStorageSavedMovies',
            JSON.stringify(bookmarkedMovies)
          );
          const localMovies = JSON.parse(
            localStorage.getItem('localStorageSavedMovies')
          );
          setLocalStorageSavedMovies(localMovies);
          setSearchedMovies([]);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setMoviesError(false);
    setApiResponse(false);
    setSavedMovies(localStorageSavedMovies);
  }, [location]);

  const handleUpdateUser = (name, email) => {
    setIsAuthChecking(true);
    api
      .updateProfile(name, email)
      .then((updatedProfile) => {
        setCurrentUser(updatedProfile);
        setApiResponse('изменения успешно применены');
      })
      .catch((err) => {
        console.log(err);
        setApiResponse('изменить профиль не получилось');
      })
      .finally(() => setIsAuthChecking(false));
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setSavedMovies([]);
    setLocalStorageMovies([]);
    setLocalStorageSavedMovies([]);
    setSearchedMovies([]);
    history.push('/');
    setJwt('');
    setIsLoggedIn(false);
    localStorage.setItem('isAuth', false);
  };

  if (isAuthChecking) {
    return <Preloader />;
  } else {
    return (
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route path="/" exact>
              <Main isLoggedIn={isLoggedIn} />
            </Route>

            <Route path="/signup">
              {isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onRegister={handleRegister}
                  apiResponse={apiResponse}
                  isAuthChecking={isAuthChecking}
                />
              )}
            </Route>

            <Route path="/signin">
              {isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  onLogin={handleLogin}
                  apiResponse={apiResponse}
                  isAuthChecking={isAuthChecking}
                />
              )}
            </Route>

            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              path="/movies"
              exact
              component={Movies}
              onSearchQuerySubmit={handleSearchQuerySubmit}
              isSearching={isSearching}
              movies={searchedMovies}
              moviesError={moviesError}
              onBookmarkMovieButtonClick={handleBookmarkMovieButtonClick}
              onDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              isShortMoviesChecked={isShortMoviesChecked}
              setIsShortMoviesChecked={setIsShortMoviesChecked}
            />

            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              path="/saved-movies"
              component={SavedMovies}
              onSearchQuerySubmit={handleSavedMoviesSearchQuerySubmit}
              isSearching={isSearching}
              movies={savedMovies}
              moviesError={moviesError}
              onDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              isShortMoviesChecked={isShortMoviesChecked}
              setIsShortMoviesChecked={setIsShortMoviesChecked}
            />

            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              path="/profile"
              component={Profile}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
              apiResponse={apiResponse}
              isAuthChecking={isAuthChecking}
            />

            <Route path="/*">
              <PageNotFound />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default App;
