import React, {useState} from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom'

const MoviesCard = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const location = useLocation();

  const movie = {
    country : props.movie.country || 'н.д.',
    director: props.movie.director || 'н.д.',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'н.д.',
    description: props.movie.description || 'н.д.',
    image: `https://api.nomoreparties.co${props.movie.image.url}` || 'н.д.',
    trailer: props.movie.trailerLink,
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}` || 'н.д.',
    movieId: props.movie.id,
    nameRU: props.movie.nameRU || 'н.д.',
    nameEN: props.movie.nameEN || 'н.д.',
}


  const movieButton = location.pathname === '/movies' ? 'movies-card__bookmark-button_type_bookmark' : 'movies-card__bookmark-button_type_delete'
  const imageSource = location.pathname === '/movies' ? `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}` : props.movie.thumbnail


  const minutesToHoursConverter = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };


  const handleBookmarkButtonClick = () => {
    props.onBookmarkMovieButtonClick(movie);
    setIsBookmarked(true);
  }

  const handleActiveBookmarkButtonClick = () => {
    setIsBookmarked(false);
    props.onDeleteMovie('60d8c7af2ad50c0b46717391')
  }


  return (
    <div className="movies-card">
      <div className="movies-card__container">
      
        <div className="movies-card__header-container">
          <div className="movies-card__header-text-container">
            <h2 className="movies-card__header">{props.movie.nameRU}</h2>
            <p className="movies-card__duration">{minutesToHoursConverter(props.movie.duration)}</p>
          </div>
          <button 
            type="button"
            onClick={isBookmarked ? handleActiveBookmarkButtonClick : handleBookmarkButtonClick} 
            className={`movies-card__bookmark-button ${movieButton} ${isBookmarked ? 'movies-card__bookmark-button_active' : ''}`} 

          />
        </div>


        <img
          className="movies-card__image"
          alt="кадр из фильма"
          src={imageSource}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
