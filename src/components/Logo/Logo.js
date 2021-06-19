import React from 'react';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img className="logo" src={logo} alt="лого" />{' '}
      </Link>
    </div>
  );
};

export default Logo;
