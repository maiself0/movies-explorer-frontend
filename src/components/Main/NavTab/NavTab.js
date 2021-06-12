import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <div>
      <nav className="navbar">

        <ul className="navbar__items">
        
          <a href="./#" className="navbar__link">
            <li className="navbar__item">О Проекте</li>
          </a>

          <a href="./#" className="navbar__link">
            <li className="navbar__item">Технологии</li>
          </a>

          <a href="./#" className="navbar__link">
            <li className="navbar__item">Студент</li>
          </a>
        </ul>
      </nav>
    </div>
  );
};

export default NavTab;
