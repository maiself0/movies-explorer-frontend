import React from 'react';
import './Header.css';
import Navigation from './Navigation/Navigation';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <Logo />
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
