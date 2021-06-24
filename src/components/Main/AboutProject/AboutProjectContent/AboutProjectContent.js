import React from 'react'
import './AboutProjectContent.css'

const AboutProjectContent = ({ text }) => {
  return (
    <div className="about-project__content">
      <h3 className="about-project__content-header">{text.header}</h3>
      <p className="about-project__content-text">{text.text}</p>
    </div>
  )
}

export default AboutProjectContent
