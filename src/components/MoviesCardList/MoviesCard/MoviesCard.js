import React from 'react';
import './MoviesCard.css';

const MoviesCard = (props) => {
  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__header-container">
          <div className="movies-card__header-text-container">
            <h2 className="movies-card__header">{props.title}</h2>
            <p className="movies-card__duration">{props.duration}</p>
          </div>
          <button type="button" className="movies-card__bookmark-button" />
        </div>

        <img
          clasName="movies-card__image"
          alt="кадр из фильма"
          src={props.image}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
