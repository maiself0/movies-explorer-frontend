import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = (props) => {
  return (
    <div className="movies">
      <Header />
      <SearchForm onSearchQuerySubmit={props.onSearchQuerySubmit} />
      <MoviesCardList
        isSearching={props.isSearching}
        movies={props.movies}
        moviesError={props.moviesError}
        onBookmarkMovieButtonClick={props.onBookmarkMovieButtonClick}
        onDeleteMovie={props.onDeleteMovie}
      />
      <Footer />
    </div>
  );
};

export default Movies;
