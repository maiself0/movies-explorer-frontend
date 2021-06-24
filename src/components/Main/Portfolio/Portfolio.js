import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfollio__header">Портфолио</h2>

        <ul className="portfolio__links-container">
          <li className="portfolio__link-container">
            <a className="portfolio__link-text" href="/#">
              Статичный сайт
            </a>
          </li>

          <li className="portfolio__link-container">
            <a className="portfolio__link-text" href="/#">
              Адаптивный сайт
            </a>
          </li>

          <li className="portfolio__link-container">
            <a className="portfolio__link-text" href="/#">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
