import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <div>
      <nav className="navbar">

        <ul className="navbar__items">

          <a href="#about-project" className="navbar__link">
            <li className="navbar__item">О проекте</li>
          </a>

          <a href="#techs" className="navbar__link">
            <li className="navbar__item">Технологии</li>
          </a>

          <a href="#about-me" className="navbar__link">
            <li className="navbar__item">Студент</li>
          </a>
        </ul>
      </nav>
    </div>
  );
};

export default NavTab;
