import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const SavedMovies = (props) => {
  return (
    <div className="saved-movies">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default SavedMovies;
