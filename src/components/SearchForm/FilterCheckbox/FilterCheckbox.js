import React, { useEffect } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = (props) => {
  const handleShortMovieCheckboxToggle = (e) => {
    props.onShortMoviesCheck(e.target.checked);
  }
  
  useEffect(() => {
    props.onShortMoviesCheck(false)
  }, [])

  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input type="checkbox" name="checkbox" className="filter-checkbox__input" onClick={handleShortMovieCheckboxToggle}/>
        <label htmlFor="checkbox" className="filter-checkbox__label">Короткометражки</label>
      </div>
    </div>
  );
};

export default FilterCheckbox;
