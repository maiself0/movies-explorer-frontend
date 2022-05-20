import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({movies ,...props}) => {
  const [moviesShown, setMoviesShown] = useState([]);
  const [isMoreMoviesButtonActive, setIsMoreMoviesButtonActive] =
    useState(false);

  const location = useLocation();

  let numberOfMoviesShown = (() => {
    const windowSize = window.innerWidth;
    if (windowSize < 510) {
      return 5;
    } else if (windowSize < 800) {
      return 8;
    } else {
      return 12;
    }
  })();
  

  let numberOfMoviesToAdd = (() => {
    const windowSize = window.innerWidth;
    if (windowSize < 510) {
      return 2;
    } else if (windowSize < 800) {
      return 2;
    } else {
      return 3;
    }
  })();

  useEffect(() => {
    const countNumberOfMoviesShown = () => {
      if (window.innerWidth >= 870) {
        numberOfMoviesShown= (12);
        numberOfMoviesToAdd = (3);
      } else if (window.innerWidth < 870 && window.innerWidth > 510) {
        numberOfMoviesShown= (8);
        numberOfMoviesToAdd = (2);
      } else {
        numberOfMoviesShown= (5);
        numberOfMoviesToAdd = (2);
      }
    };
    
    window.addEventListener('resize', countNumberOfMoviesShown);
    return () => {
      window.removeEventListener('resize', countNumberOfMoviesShown);
    };
  }, []);
  
  useEffect(() => {
    setMoviesShown(movies?.slice(0, numberOfMoviesShown));

    movies?.length > numberOfMoviesShown
      ? setIsMoreMoviesButtonActive(true)
      : setIsMoreMoviesButtonActive(false);
  }, [movies, numberOfMoviesShown]);

  // кнопка ещё => показ новых карточек
  const handleMoreButtonClick = () => {
    setMoviesShown(
      movies.slice(0, moviesShown.length + numberOfMoviesToAdd)
    );
  };

  useEffect(()=>{
    
    if (location.pathname === '/movies' && movies.length - moviesShown.length === 0) {
      setIsMoreMoviesButtonActive(false);
    }
  }, [movies, moviesShown])

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.isSearching && <Preloader />}
        {props.moviesError && (
          <span className="movies-card-list__error">{props.moviesError}</span>
        )}

        <div className="movies-card-list__grid-container">
          {moviesShown?.map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                key={location.pathname === '/movies' ? movie.id : movie._id}
                onBookmarkMovieButtonClick={props.onBookmarkMovieButtonClick}
                onDeleteMovie={props.onDeleteMovie}
                savedMovies={props.savedMovies}
                movieButtonCss={location.pathname === '/movies' ? 'movies-card__bookmark-button_type_bookmark' : 'movies-card__bookmark-button_type_delete'}
                imageSourceCss={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
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
