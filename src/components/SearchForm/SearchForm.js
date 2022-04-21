import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = (props) => {
  const [isSearchQueryValid, setIsSearchQueryValid] = useState(true);
  const [searchQuery, setSearchQuery] = useState('')

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value)
    setIsSearchQueryValid(e.target.checkValidity())
  }

  const handleMoviesApiQuery = (e) => {
    e.preventDefault();
    props.onSearchQuerySubmit(searchQuery);
  }

  useEffect(() => {
    if (searchQuery) {
      props.onSearchQuerySubmit(searchQuery);
    }
  }, [props.isShortMoviesChecked])

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleMoviesApiQuery}>
        <div className="search-form__input-container">
          <div className="search-form__icon" />
          <input
            name="search"
            id="search"
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            value={searchQuery || ''}
            onChange={handleQueryChange}
            autoComplete="off"
            required
          />
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>

        <div className="search-form__error-container">
        {!isSearchQueryValid && <span className="search-form__error error">Нужно ввести ключевое слово</span>}
        </div>
        
        <FilterCheckbox onShortMoviesCheck={props.onShortMoviesCheck} onSearchQuerySubmit={props.onSearchQuerySubmit} searchQuery={searchQuery}/>
      </form>
    </section>
  );
};

export default SearchForm;
