import React from 'react';
import './Navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <div className="navigation">
        <Link
          to="/signup"
          className="navigation__link navigation__link_register"
        >
          Регистрация
        </Link>
        <Link to="/signin" className="navigation__link">
          <button className="navigation__link-button">Войти</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="navigation">
      <NavLink
        to="/movies"
        activeClassName="navigation__link_active"
        className="navigation__link navigation__link_loggedin navigation__link_movies"
      >
        Фильмы
      </NavLink>

      <NavLink
        to="/saved-movies"
        activeClassName="navigation__link_active"
        className="navigation__link navigation__link_loggedin navigation__link_saved-movies"
      >
        Сохранённые фильмы
      </NavLink>
      <Link
        to="/profile"
        className="navigation__link navigation__link_loggedin navigation__link_account"
      >
        Аккаунт
      </Link>


    </div>
    )
  }
};

export default Navigation;
