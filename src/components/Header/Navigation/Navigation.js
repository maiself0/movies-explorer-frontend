import React, { useState } from 'react';
import './Navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const [isMenuOpened, setMenuOpened] = useState(false);

  function handleHamburgerClick() {
    setMenuOpened(!isMenuOpened);
  }

  if (location.pathname === '/') {
    return (
      <nav className="navigation">
        <Link
          to="/signup"
          className="navigation__link navigation__link_register"
        >
          Регистрация
        </Link>
        <Link to="/signin" className="navigation__link">
          <button className="navigation__link-button">Войти</button>
        </Link>
      </nav>
    );
  } else {
    return (
      <nav className={`navigation ${isMenuOpened===true ? "navigation_hamburger_clicked" : ""}`}>

        <div className={`navigation__hamburger ${isMenuOpened===true ? 'navigation__hamburger_hamburger_clicked' : '' }`} onClick={handleHamburgerClick}/> 

        <Link
          to="/" exact
          activeClassName="navigation__link_active navigation__link_hamburger"
          className={`navigation__link ${isMenuOpened===true ? "navigation__link_hamburger_clicked" : ""} navigation__link_loggedin navigation__link_main`}
        >
          Главная
        </Link>

        <NavLink
          to="/movies"
          activeClassName="navigation__link_active navigation__link_hamburger"
          className={`navigation__link ${isMenuOpened===true ? "navigation__link_hamburger_clicked" : ""} navigation__link_loggedin navigation__link_movies`}
        >
          Фильмы
        </NavLink>

        <NavLink
          to="/saved-movies"
          activeClassName="navigation__link_active navigation__link_hamburger"
          className={`navigation__link ${isMenuOpened===true ? "navigation__link_hamburger_clicked" : ""} navigation__link_loggedin navigation__link_saved-movies`}
        >
          Сохранённые фильмы
        </NavLink>
        <Link
          to="/profile"
          className={`navigation__link ${isMenuOpened===true ? "navigation__link_hamburger_clicked" : ""} navigation__link_loggedin navigation__link_account`}
        >
          Аккаунт
        </Link>
      </nav>
    );
  }
};

export default Navigation;
