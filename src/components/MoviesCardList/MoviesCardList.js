import React from 'react'
import './MoviesCardList.css'
import MoviesCard from './MoviesCard/MoviesCard'

import image1 from '../../images/image1.png'
import image2 from '../../images/image2.png'
import image3 from '../../images/image3.png'
import image4 from '../../images/image4.png'
import image5 from '../../images/image5.png'
import image6 from '../../images/image6.png'
import image7 from '../../images/image7.png'
import image8 from '../../images/image8.png'
import image9 from '../../images/image9.png'
import image10 from '../../images/image10.png'
import image11 from '../../images/image11.png'
import image12 from '../../images/image12.png'

const MoviesCardList = () => {
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        <div className="movies-card-list__grid-container">
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image1}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image2}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image3}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image4}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image5}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image6}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image7}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image8}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image9}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image10}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image11}/>
          <MoviesCard title="33 слова о дизайне" duration="1ч 47м" image={image12}/>
          
        </div>

        <div className="movies-card-list__button-more-container">
          <button type="button" className="movie-card-list__button-more">Ещё</button>
        </div>

      </div>

    </div>
  )
}

export default MoviesCardList
