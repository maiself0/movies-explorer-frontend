import React from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import Preloader from '../Preloader/Preloader';

const Login = ({ onLogin, apiError, isAuthChecking }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password)
    resetForm();
  };

  if (isAuthChecking) {
    return (<Preloader />)
  } else {
  return (
    <div className="login">
      <div className="login__container">
      {isAuthChecking && <Preloader />}
        <div className="login__header-container">
          <Logo />
          <h1 className="login__header">Рады видеть!</h1>
        </div>

        <form className="login__form" onSubmit={handleLoginSubmit}>
          <div className="login__inputs-containter">
            <label htmlFor="email" className="login__label">
              E-mail
            </label>
            <input
              name="email"
              id="email"
              value={values.email || ""}
              onChange={handleChange}
              type="email"
              className="login__input"
              required
            />
            <span className="email-error error">{errors.email}</span>

            <label htmlFor="password" className="login__label">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              value={values.password || ""}
              onChange={handleChange}
              type="password"
              className="login__input"
              required
            />
            <span className="password-error error">{errors.password}</span>
          </div>

          <div className="login__button-container">
            <span className="api-error error">{apiError}</span>
            <button 
              type="submit" 
              className={`register__button ${!isValid && "disabled-button"}`}
              disabled={!isValid}
            >
              Войти
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
  );}
};

export default Login;
