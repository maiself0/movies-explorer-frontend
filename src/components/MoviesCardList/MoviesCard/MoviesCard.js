import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom'

const MoviesCard = (props) => {
  const location = useLocation();

  const movieButton = location.pathname === '/movies' ? 'movies-card__bookmark-button_type_bookmark' : 'movies-card__bookmark-button_type_delete'

  const minutesToHoursConverter = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };


  return (
    <div className="movies-card">
      <div className="movies-card__container">
      
        <div className="movies-card__header-container">
          <div className="movies-card__header-text-container">
            <h2 className="movies-card__header">{props.movie.nameRU}</h2>
            <p className="movies-card__duration">{minutesToHoursConverter(props.movie.duration)}</p>
          </div>
          <button type="button" className={`movies-card__bookmark-button ${movieButton}`} />
        </div>

        <img
          className="movies-card__image"
          alt="кадр из фильма"
          src={`https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
