import React from 'react';
import './Main.css';
import Header from '../Header/Header'
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject'

const Main = () => {
  return (
    <div className='main'>
      <Header />
      <Promo />
      <AboutProject />
      
    </div>
  );
};

export default Main;
