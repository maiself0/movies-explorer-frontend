import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [numberOfMoviesShown, setNumberOfMoviesShown] = useState(0);
  const [moviesShown, setMoviesShown] = useState([]);
  const [numberOfMoviesToAdd, setNumberOfMoviesToAdd] = useState(0);
  const [isMoreMoviesButtonActive, setIsMoreMoviesButtonActive] =
    useState(false);

  const location = useLocation();
  
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const countNumberOfMoviesShown = () => {
    if (windowWidth >= 800) {
      setNumberOfMoviesShown(12);
      setNumberOfMoviesToAdd(3);
    } else if (windowWidth < 800 && windowWidth > 510) {
      setNumberOfMoviesShown(8);
      setNumberOfMoviesToAdd(2);
    } else {
      setNumberOfMoviesShown(5);
      setNumberOfMoviesToAdd(2);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    countNumberOfMoviesShown();
  }, [windowWidth]);

  useEffect(() => {
    setMoviesShown(props.movies.slice(0, numberOfMoviesShown));

    props.movies.length <= numberOfMoviesShown
      ? setIsMoreMoviesButtonActive(false)
      : setIsMoreMoviesButtonActive(true);
  }, [props.movies]);

  // кнопка ещё => показ новых карточек
  const handleMoreButtonClick = () => {
    setMoviesShown(
      props.movies.slice(0, moviesShown.length + numberOfMoviesToAdd)
    );

    if (
      moviesShown.length >=
      props.movies.length - numberOfMoviesToAdd
    ) {
      setIsMoreMoviesButtonActive(false);
    }
  };

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.isSearching && <Preloader />}
        {props.moviesError && (
          <span className="movies-card-list__error">{props.moviesError}</span>
        )}

        <div className="movies-card-list__grid-container">
          {moviesShown?.map((movie) => {
            console.log(movie)
            return (
              <MoviesCard
                movie={movie}
                key={location.pathname === '/movies' ? movie.id : movie._id}
                onBookmarkMovieButtonClick={props.onBookmarkMovieButtonClick}
                onDeleteMovie={props.onDeleteMovie}
              />
            );
          })}
        </div>

        <div className="movies-card-list__button-more-container">
          {isMoreMoviesButtonActive && (
            <button
              type="button"
              className="movie-card-list__button-more"
              onClick={handleMoreButtonClick}
            >
              Ещё
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesCardList;
