import React from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header-container">
          <Logo />
          <h1 className="register__header">Добро пожаловать!</h1>
        </div>

        <form className="register__form">
          <div className="register__inputs-containter">
            <label htmlFor="name" className="register__label">
              Имя
            </label>
            <input name="name" id="name" className="register__input" required />
            <span className="name-error error"></span>

            <label htmlFor="email" className="register__label">
              E-mail
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className="register__input"
              required
            />
            <span className="email-error error"></span>

            <label htmlFor="password" className="register__label">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              type="password"
              className="register__input"
              required
            />
            <span className="password-error error">Что-то пошло не так...</span>
          </div>

          <div className="register__button-container">
            <button type="submit" className="register__button">
              Зарегистрироваться
            </button>

            <div className="register__button-subtext-container">
              <p className="register__button-subtext">Уже зарегистрированы?</p>
              <Link className="register__signin-link" to="/signin">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
