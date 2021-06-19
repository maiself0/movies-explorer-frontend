import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/signup" className="navigation__link navigation__link_register">Регистрация</Link>
      <Link to='/signin' className="navigation__link"><button className="navigation__link-button">Войти</button></Link>
    </div>
  );
};

export default Navigation;
