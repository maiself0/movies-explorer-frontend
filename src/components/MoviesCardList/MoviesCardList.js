import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = (props) => {
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.isSearching && <Preloader />}
        {props.moviesNotFound && <span className="movies-card-list__error">Ничего не найдено</span>}

        <div className="movies-card-list__grid-container">

          {props.movies.map((movie) => {
            return <MoviesCard movie={movie} key={movie.id} />;
          })}
        </div>

        <div className="movies-card-list__button-more-container">
          <button type="button" className="movie-card-list__button-more">
            Ещё
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesCardList;
