import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (props) => {
  return (
    <div>
      <Header />
      <SearchForm />
      <MoviesCardList movies={props.movies} />
      <Footer />
    </div>
  );
};

export default SavedMovies;
