import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
// import FilterCheckbox from '../SearchForm/FilterCheckbox/FilterCheckbox';

const Movies = (props) => {
  return (
    <div className="movies">
      <Header />
      <SearchForm 
        isShortMoviesChecked={props.isShortMoviesChecked}
        onSearchQuerySubmit={props.onSearchQuerySubmit} 
        onShortMoviesCheck={props.onShortMoviesCheck}
        // checkbox={}
      />

      <MoviesCardList
        isSearching={props.isSearching}
        movies={props.movies}
        moviesError={props.moviesError}
        onBookmarkMovieButtonClick={props.onBookmarkMovieButtonClick}
        onDeleteMovie={props.onDeleteMovie}
        savedMovies={props.savedMovies}
      />
      
      <Footer />
    </div>
  );
};

export default Movies;
