import React from 'react';
import './AboutMe.css';
import aboutMePhoto from '../../../images/aboutme.png'

const AboutMe = () => {
  return (
    <div className="about-me" id="about-me">
      <div className="about-me__container">
        <div className="about-me__header-container">
          <h2 className="about-me__header">Студент</h2>
        </div>

        <div className="about-me__content-container">
          <div className="about-me__content-left">
            <h3 className="about-me__content-header">Виталий</h3>
            <p className="about-me__content-subheader">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="about-me__content-text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>

            <ul className="about-me__links">
              <li><a  className="about-me__link" href="https://facebook.com">Facebook</a></li>
              <li><a  className="about-me__link" href="https://github.com/stbukhgolts">Github</a></li>
            </ul>
          </div>

          <div className="about-me__content-right">
            <img className="about-me__content-img" alt="фото студента" src={aboutMePhoto}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
