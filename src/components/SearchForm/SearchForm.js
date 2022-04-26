import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

const SearchForm = ({
  isShortMoviesChecked,
  onSearchQuerySubmit,
  ...props
}) => {
  const location = useLocation();
  const [isSearchQueryValid, setIsSearchQueryValid] = useState(true);
  const [searchQuery, setSearchQuery] = useState(() =>
    location.pathname === '/saved-movies'
      ? ''
      : localStorage.getItem('searchQuery')
  );

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchQueryValid(e.target.checkValidity());
  };

  const handleSearchQuerySubmit = (e) => {
    e.preventDefault();
    onSearchQuerySubmit(searchQuery);
  };

  useEffect(() => {
    if (searchQuery) {
      onSearchQuerySubmit(searchQuery);
    }
  }, [isShortMoviesChecked]);

  return (
    <section className="search-form">
      <form
        className="search-form__container"
        onSubmit={handleSearchQuerySubmit}
      >
        <div className="search-form__input-container">
          <div className="search-form__icon" />
          <input
            name="search"
            id="search"
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            value={searchQuery}
            onChange={handleQueryChange}
            autoComplete="off"
            required
          />
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>

        <div className="search-form__error-container">
          {!isSearchQueryValid && (
            <span className="search-form__error error">
              Нужно ввести ключевое слово
            </span>
          )}
        </div>

        <FilterCheckbox
          onShortMoviesCheck={props.onShortMoviesCheck}
          isShortMoviesChecked={props.isShortMoviesChecked}
          onSearchQuerySubmit={onSearchQuerySubmit}
          searchQuery={searchQuery}
        />
      </form>
    </section>
  );
};

export default SearchForm;
