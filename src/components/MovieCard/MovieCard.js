import { useState } from 'react';

function MovieCard(props) {
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function testHandler() {
    setIsMovieSaved(!isMovieSaved)
  }

  return (
    <li className='movie-card'>
      <div className='movie-card__container'>
        <img className='movie-card__image' alt={'Soprano'} src={props.card}/>
          <button className={`movie-card__save-btn ${isMovieSaved ? 'movie-card__saved' : ''}`} type='button' onClick={testHandler} aria-label='Сохранить'>Соxранить</button>
          { false && <button className='movie-card__delete-btn' title='Отмена сохранения' type='button' aria-label='Отмена сохранения' />}
        <div className='movie-card__info'>
          <h2 className='movie-card__title'>Gimme Danger: История Игги и The Stooges</h2>
          <p className='movie-card__duration'>1ч 17м</p>
        </div>
      </div>
    </li>
  )
}

export default MovieCard;
