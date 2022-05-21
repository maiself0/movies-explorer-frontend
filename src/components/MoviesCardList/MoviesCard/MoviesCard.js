import React, { useState, useEffect } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom'

const MoviesCard = ({movieButtonCss, imageSourceCss, movie, ...props}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const location = useLocation();

  const movieCard = {
    country : movie.country || 'н.д.',
    director: movie.director || 'н.д.',
    duration: movie.duration || 0,
    year: movie.year || 'н.д.',
    description: movie.description || 'н.д.',
    image: `https://api.nomoreparties.co${movie.image.url}` || 'н.д.',
    trailer: movie.trailerLink,
    thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail.url}` || 'н.д.',
    movieId: movie.id,
    nameRU: movie.nameRU || 'н.д.',
    nameEN: movie.nameEN || 'н.д.',
}
  const savedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies'))
  const savedMovie = savedMovies?.find((movie) => movie.movieId === movieCard.movieId)


  useEffect(() => {
      if(savedMovie) {
        setIsBookmarked(true)
      }

  }, [savedMovie])


  
  const minutesToHoursConverter = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };
  
  const handleBookmarkButtonClick = () => {
    props.onBookmarkMovieButtonClick(movieCard);
    setIsBookmarked(true);
  }
  
  const handleActiveBookmarkButtonClick = () => {
    setIsBookmarked(false);
    props.onDeleteMovie(savedMovie._id)    
  }
  
  const handleDeleteMovieButtonClick = () => {
    props.onDeleteMovie(movie._id)
    setIsBookmarked(false);
  }
  

  const toggleBookmark = isBookmarked ? handleActiveBookmarkButtonClick : handleBookmarkButtonClick
  const chooseDeleteOrBookmarkButtonClick = location.pathname === '/movies' ? toggleBookmark : handleDeleteMovieButtonClick

  return (
    <div className="movies-card">
      <div className="movies-card__container">
      
        <div className="movies-card__header-container">
          <div className="movies-card__header-text-container">
            <h2 className="movies-card__header">{movie.nameRU}</h2>
            <p className="movies-card__duration">{minutesToHoursConverter(movie.duration)}</p>
          </div>
          <button 
            type="button"
            onClick={chooseDeleteOrBookmarkButtonClick} 
            className={`movies-card__bookmark-button ${movieButtonCss} ${isBookmarked ? 'movies-card__bookmark-button_active' : ''}`} 

          />
        </div>

        <a className="movies-card__image-container" href={movie.trailerLink ? movie.trailerLink : movie.trailer} rel="noreferrer" target="_blank" >
          <img
            className="movies-card__image"
            alt="кадр из фильма"
            src={imageSourceCss}
          />
        </a>
      </div>
    </div>
  );
};

export default MoviesCard;
