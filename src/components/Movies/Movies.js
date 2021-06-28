import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = (props) => {
  return (
    <div className="movies">
      <Header />
      <SearchForm 
        onSearchQuerySubmit={props.onSearchQuerySubmit} 
        setIsShortMoviesChecked={props.setIsShortMoviesChecked}
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
