import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <div className="techs__heading-container">
          <h2 className="techs__heading">Технологии</h2>
        </div>

        <div className="techs__content-container">
          <h3 className="techs__content-container-heading">7 технологий</h3>
          <p className="techs__content-container-text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>

        <ul className="techs__techs-container">
          <li className="techs__techs-name">HTML</li>
          <li className="techs__techs-name">CSS</li>
          <li className="techs__techs-name">JS</li>
          <li className="techs__techs-name">React</li>
          <li className="techs__techs-name">Git</li>
          <li className="techs__techs-name">Express.js</li>
          <li className="techs__techs-name">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
