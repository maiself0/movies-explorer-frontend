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
  const [isShortMoviesChecked, setIsShortMoviesCheck] = useState(Boolean(+localStorage.getItem('isShortMoviesChecked')));
  const [moviesError, setMoviesError] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);
  const [localStorageSavedMovies, setLocalStorageSavedMovies] = useState([]);

  const handleShortMovieCheckboxToggle = (e) => {
    setIsShortMoviesCheck(e);
    localStorage.setItem('isShortMoviesChecked', e ? 1 : 0);
  };

  const sortShortMovies = (movies) => {
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    return shortMovies;
  };

  const handleMoviesSearch = (movies, searchQuery) => {
    movies = isShortMoviesChecked ? sortShortMovies(movies) : movies;

    const searchedMovies = movies.filter((movie) => {
      return movie?.nameRU.toLowerCase().includes(searchQuery?.toLowerCase());
    });

    if (searchedMovies.length === 0) {
      setMoviesError('Ничего не найдено');
    }

    return searchedMovies;
  };

  const handleSearchQuerySubmit = (searchQuery) => {
    setIsSearching(true);
    setMoviesError(false);
    setSearchedMovies([]);
    localStorage.setItem('searchQuery', searchQuery);

    const localStorageMovies = JSON.parse(localStorage.getItem('movies'));

    if (!localStorageMovies) {
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          const searchedMovies = handleMoviesSearch(movies, searchQuery);
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
        localStorageMovies,
        searchQuery
      );
      setSearchedMovies(searchedMovies);
      setIsSearching(false);
    }
  };

  const sortSavedMoviesOnShortMoviesChecked = isShortMoviesChecked
    ? sortShortMovies(localStorageSavedMovies)
    : localStorageSavedMovies;

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
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const api = new Api({
    url: process.env.REACT_APP_IP,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

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

    const localMovies = JSON.parse(
      localStorage.getItem('localStorageSavedMovies')
    );
    if (localMovies) {
      setLocalStorageSavedMovies(localMovies);
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
    // setSavedMovies(localStorageSavedMovies);
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
    setIsShortMoviesCheck(false);
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
                <Redirect to="/movies" />
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
                <Redirect to="/movies" />
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
              moviesError={moviesError}
              isShortMoviesChecked={isShortMoviesChecked}
              onShortMoviesCheck={handleShortMovieCheckboxToggle}
              movies={searchedMovies}
              onBookmarkMovieButtonClick={handleBookmarkMovieButtonClick}
              onDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
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
              onShortMoviesCheck={handleShortMovieCheckboxToggle}
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
