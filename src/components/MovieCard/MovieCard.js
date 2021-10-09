/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useLocation } from 'react-router';
import { beatfilmApiURL } from '../../utils/constants';
function MovieCard(props) {
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const location = useLocation();
  function testHandler() {
    setIsMovieSaved(!isMovieSaved)
  }
  const { card } = props;
  
  return (
    <li className='movie-card'>
      <div className='movie-card__container'>
        <img className='movie-card__image' alt={card.nameRU} src={`${beatfilmApiURL}${card.image.url}`}/>
        {location.pathname === '/movies' && <button className={`movie-card__save-btn ${isMovieSaved ? 'movie-card__saved' : ''}`} type='button' onClick={testHandler} aria-label='Сохранить'>Соxранить</button>}
        {location.pathname === '/saved-movies'  && <button className='movie-card__delete-btn' title='Отмена сохранения' type='button' aria-label='Отмена сохранения' />}
        <div className='movie-card__info'>
          <h2 className='movie-card__title'>{card.nameRU}</h2>
          <p className='movie-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
        </div>
      </div>
    </li>
  )
}

export default MovieCard;
