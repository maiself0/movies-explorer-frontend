import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <div className="search-form">
      <form className="search-form__container">
        <div className="search-form__input-container">
          <div className="search-form__icon" />
          <input
            name="search"
            id="search"
            type="text"
            className="search-form__input"
            placeholder="Фильм"
          />
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>
        
        <FilterCheckbox />
      </form>
    </div>
  );
};

export default SearchForm;
