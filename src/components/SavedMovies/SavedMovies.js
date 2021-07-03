import React, { useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (props) => {
  return (
    <div>
      <Header />
      <SearchForm 
        isShortMoviesChecked={props.isShortMoviesChecked}

        onSearchQuerySubmit={props.onSearchQuerySubmit}  
        setIsShortMoviesChecked={props.setIsShortMoviesChecked}/>
      <MoviesCardList 
        isSearching={props.isSearching}
        movies={props.movies} 
        moviesError={props.moviesError}
        onDeleteMovie={props.onDeleteMovie}
        savedMovies={props.savedMovies}
      />
      <Footer />
    </div>
  );
};

export default SavedMovies;
