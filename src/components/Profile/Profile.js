import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = (props) => {
  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__container">
          <h2 className="profile__header">Привет, {props.userName}!</h2>

          <form className="profile__form">
            <div className="profile__input-container">
              <label for="name" className="profile__input-label">Имя</label>
              <input name="name" placeholder={props.userName} className="profile__input"></input>
            </div>

            <hr className="profile__line" />
            
            <div className="profile__input-container">
              <label for="name" className="profile__input-label">Почта</label>
              <input name="name" placeholder={props.email} className="profile__input"></input>
            </div>

            <div className="profile__buttons-container">
              <button className="profile__button" type="submit">Редактировать</button>
              <button className="profile__button profile__button_type_warning" type="submit">Выйти из аккаунта</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
