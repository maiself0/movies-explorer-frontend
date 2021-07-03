import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const Main = ({ isLoggedIn }) => {
  return (
    <div className="main">
      <Header isLoggedIn={isLoggedIn} />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
};

export default Main;
