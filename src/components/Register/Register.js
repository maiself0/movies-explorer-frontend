import React from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import Preloader from '../Preloader/Preloader';

const Register = ({ onRegister, apiError, isAuthChecking }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister(values)
    resetForm();
  };

  if (isAuthChecking) {
    return (<Preloader />)
  } else {
    return (

      <div className="register">
        <div className="register__container">       
          <div className="register__header-container">
            <Logo />
            <h1 className="register__header">Добро пожаловать!</h1>
          </div>
  
          <form className="register__form" onSubmit={handleRegisterSubmit}>
            <div className="register__inputs-containter">
              <label htmlFor="name" className="register__label">
                Имя
              </label>
              <input
                name="name"
                id="name"
                value={values.name || ""}
                onChange={handleChange}
                className="register__input"
                autoComplete="off"
                pattern="[а-яА-Яa-zA-ZёË\- ]+"
                required
              />
              <span className="name-error error">{errors.name}</span>
  
              <label htmlFor="email" className="register__label">
                E-mail
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={values.email || ""}
                onChange={handleChange}
                className="register__input"
                autoComplete="off"
                required
              />
              <span className="email-error error">{errors.email}</span>
  
              <label htmlFor="password" className="register__label">
                Пароль
              </label>
              <input
                name="password"
                id="password"
                type="password"
                value={values.password || ""}
                onChange={handleChange}
                className="register__input"
                autoComplete="off"
                required
              />
              <span className="password-error error">{errors.password}</span>
            </div>
  
            <div className="register__button-container">
              <span className="api-error error">{apiError}</span>
              <button 
                type="submit" 
                className={`register__button ${!isValid && "disabled-button"}`}
                disabled={!isValid}
              >
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
  }
  
};

export default Register;
