import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input type="checkbox" name="checkbox" className="filter-checkbox__input" />
        <label htmlFor="checkbox" className="filter-checkbox__label">Короткометражки</label>
      </div>
    </div>
  );
};

export default FilterCheckbox;
