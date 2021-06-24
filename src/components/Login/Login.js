import React from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header-container">
          <Logo />
          <h1 className="login__header">Рады видеть!</h1>
        </div>

        <form className="login__form">
          <div className="login__inputs-containter">
            <label htmlFor="email" className="login__label">
              E-mail
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className="login__input"
              required
            />
            <span className="email-error error"></span>

            <label htmlFor="password" className="login__label">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              type="password"
              className="login__input"
              required
            />
            <span className="password-error error"></span>
          </div>

          <div className="login__button-container">
            <button type="submit" className="login__button">
              Войтиs
            </button>

            <div className="login__button-subtext-container">
              <p className="login__button-subtext">Ещё не зарегистрированы?</p>
              <Link className="login__signin-link" to="/signup">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
