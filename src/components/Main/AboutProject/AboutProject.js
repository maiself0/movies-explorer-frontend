import React from 'react';
import './AboutProject.css';
import AboutProjectContent from './AboutProjectContent/AboutProjectContent';

const textContent = [
  {
    header: 'Дипломный проект включал 5 этапов',
    text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
  },
  {
    header: 'На выполнение диплома ушло 5 недель',
    text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
  },
];

const AboutProject = () => {
  return (
    <div className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__heading">О проекте</h2>

        <div className="about-project__content-container">
          {textContent.map((text, i) => (
            <AboutProjectContent key={i} text={text} />
          ))}
        </div>

        <div className="grid-container">
          <div className="grid-item grid-item-1"><p className="grid-item__text grid-item__text-1">1 неделя</p></div>
          <div className="grid-item grid-item-2"><p className="grid-item__text grid-item__text-2">4 недели</p></div>
          <div className="grid-item grid-item-3"><p className="grid-item__text grid-item__text-3">Back-end</p></div>
          <div className="grid-item grid-item-4"><p className="grid-item__text grid-item__text-4">Front-end</p></div>

        </div>

      </div>
    </div>
  );
};

export default AboutProject;
