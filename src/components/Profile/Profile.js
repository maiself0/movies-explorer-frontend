import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onLogout }) => {
  const { values, handleChange, errors, isValid } = useFormValidation();

  const currentUser = React.useContext(CurrentUserContext);

  const handleProfileChangeSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__container">
          <h2 className="profile__header">Привет, {currentUser.name}!</h2>

          <form className="profile__form" onSubmit={handleProfileChangeSubmit}>
            <div className="profile__input-container">
              <label htmlFor="name" className="profile__input-label">
                Имя
              </label>
              <input
                name="name"
                placeholder={currentUser.name}
                className="profile__input"
                value={values.name || ''}
                pattern="[а-яА-Яa-zA-ZёË\- ]+"
                onChange={handleChange}
              ></input>
              <span className="profile__name-error error">{errors.name}</span>
            </div>

            <hr className="profile__line" />

            <div className="profile__input-container">
              <label htmlFor="email" className="profile__input-label">
                Почта
              </label>
              <input
                name="email"
                type="email"
                placeholder={currentUser.email}
                className="profile__input"
                value={values.email || ''}
                onChange={handleChange}
              ></input>
              <span className="profile__email-error error">{errors.email}</span>
            </div>


            <div className="profile__buttons-container">
              <button
                className={`profile__button ${!isValid && 'disabled-button'}`}
                type="submit"
                disabled={!isValid}
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_type_warning"
                type="submit"
                onClick={onLogout}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
