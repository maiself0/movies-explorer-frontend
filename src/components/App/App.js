import './App.css';
// import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as moviesApi from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesNotFound, setMoviesNotFound] = useState(false)

  const handleMoviesSearch = (movies, searchQuery) => {
    const searchedMovies = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    });
    setMovies(searchedMovies);

    if(searchedMovies.length === 0) {
      setMoviesNotFound(true)
    } 
    // return searchedMovies;
  };

  const handleSearchQuerySubmit = (searchQuery) => {
    setIsSearching(true);
    setMoviesNotFound(false)
    setMovies([]);

    moviesApi
      .getMovies()
      .then((movies) => {  
      localStorage.setItem('movies', JSON.stringify(movies));
      const moviesAll = JSON.parse(localStorage.getItem('movies'));
      handleMoviesSearch(moviesAll, searchQuery);
    })
      .catch(err => console.log(err))
      .finally(() => setIsSearching(false))
  };

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
            movies={movies}
            moviesNotFound={moviesNotFound}
          />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
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
