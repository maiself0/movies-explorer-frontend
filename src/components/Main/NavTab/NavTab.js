import React from 'react';
import './NavTab.css'

const NavTab = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar__items">
          <li className="navbar__item"><a href='./#' className="navbar__link">О Проекте</a></li>
          <li className="navbar__item"><a href='./#' className="navbar__link">Технологии</a></li>
          <li className="navbar__item"><a href='./#' className="navbar__link">Студент</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavTab;
