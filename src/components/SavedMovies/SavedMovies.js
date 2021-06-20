import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
  return (
    <div>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
};

export default SavedMovies;
