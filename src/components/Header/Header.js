import React from 'react';
import './Header.css';
import Navigation from './Navigation/Navigation';
import Logo from '../Logo/Logo';

const Header = ({ isLoggedIn } ) => {
  return (
    <div className="header">
      <div className="header__container">
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default Header;
