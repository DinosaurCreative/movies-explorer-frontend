import React from 'react';
import './MovieCard.css';

function MovieCard() {
  return (
    <li className='movie-card'>
      <div className='movie-card__container'>
        <img className='movie-card__image' alt={'Soprano'} src='https://avatars.mds.yandex.net/get-kinopoisk-post-img/1345014/eb0c0c351b2ea555106c6dbf0f15c5b5/960x540'/>
          <button className='movie-card__save-btn' type='button' aria-label='Сохранить'>Соxранить</button>
          <button className='movie-card__delete-btn' title='Отмена сохранения' type='button' aria-label='Отмена сохранения' />
        <div className='movie-card__info'>
          <h2 className='movie-card__title'>Gimme Danger: История Игги и The Stooges</h2>
          <p className='movie-card__duration'>1ч 17м</p>
        </div>
      </div>
    </li>
  )
}

export default MovieCard;
