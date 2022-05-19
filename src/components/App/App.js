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
import { useEffect, useMemo, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

function App() {
  // фильмы
  const [isSearching, setIsSearching] = useState(false);
  const [isShortMoviesChecked, setIsShortMoviesCheck] = useState(
    Boolean(+localStorage.getItem('isShortMoviesChecked'))
  );
  const [moviesError, setMoviesError] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);


  const handleShortMovieCheckboxToggle = (e) => {
    setIsShortMoviesCheck(e);
    localStorage.setItem('isShortMoviesChecked', e ? 1 : 0);
  };

  const handleMoviesSearch = (movies, searchQuery) => {
    const sortShortMovies = (movies) => {
      const shortMovies = movies.filter((movie) => movie.duration <= 40);
      return shortMovies;
    };

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

  const handleSavedMoviesSearchQuerySubmit = (searchQuery) => {
    setMoviesError(false);
    const searchedMovies = handleMoviesSearch(
      savedMovies,
      searchQuery
    );
    setSavedMovies(searchedMovies);
  };

  const handleBookmarkMovieButtonClick = (movie) => {
    api
      .addMovie(movie)
      .then((addedMovie) => {
        setSavedMovies([...savedMovies, addedMovie]);
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const api = useMemo(
    () =>
      new Api({
        url: process.env.REACT_APP_IP,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }),
    []
  );

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

  async function handleLogin(email, password) {
    setIsAuthChecking(true);

    try {
      let token = await api.login(email, password);
      let res = await api.getUserData(token);
      if (res) {
        setCurrentUser(res);
        setIsLoggedIn(true);
        setApiResponse('');
        localStorage.setItem('isAuth', true);
        history.push('/movies')
      }

    } catch (e) {
      setApiResponse('Что-то пошло не так');
      console.log(e);
    } finally {
      setIsAuthChecking(false);
    }
  }

  useEffect(() => {
    async function tokenCheck () {
      const token = localStorage.getItem('jwt');
      if (token) {
        setIsAuthChecking(true);
        try {
          let res = await api.getUserData(token)
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
          }
        
        } catch (e) {
          console.log(e)
        } finally {
          setIsAuthChecking(false)
        }
      }
    };

    tokenCheck();
  }, [api]);

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/saved-movies' && savedMovies.length === 0) {
      async function getBookmarkedMovies() {
        try {
          let bookmarkedMovies =  await api.getBookmarkedMovies()
          if (bookmarkedMovies) {
            setSavedMovies(bookmarkedMovies);         
            setSearchedMovies([]);
          }
        } catch (e) {
          console.log(e)
        }
      }
      getBookmarkedMovies()
    }
  }, [api, isLoggedIn, location, savedMovies]);


  useEffect(() => {
    setMoviesError(false);
    setApiResponse(false);
    if (location.pathname === '/saved-movies') {
      setSearchedMovies([])
    }
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
    setSearchedMovies([]);
    history.push('/');
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
