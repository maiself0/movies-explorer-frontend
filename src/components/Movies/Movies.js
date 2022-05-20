import React from 'react';
import './Movies.css';
import Header from '../Header/Header';

import Footer from '../Footer/Footer';

const Movies = (props) => {
  return (
    <div className="movies">
      <Header />
      {props.children}

      <Footer />
    </div>
  );
};

export default Movies;
