import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <div className="page-not-found__header-container">
          <h1 className="page-not-found__header">404</h1>
          <p className="page-not-found__text">Страница не найдена</p>
        </div>

        <div className="page-not-found__link-container">
          <Link className="page-not-found__link" to="/">
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
