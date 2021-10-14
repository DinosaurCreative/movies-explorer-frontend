/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import { beatfilmApiURL } from '../../utils/constants';
import mainApi from '../../utils/mainApi';
import ModalPopup from '../ModalPopup/ModalPopup';

function MovieCard(props) {
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const location = useLocation();
  const { card } = props;
  console.log(card);
  
  function deleteMovieHandler() {
    mainApi.deleteMovie(card.id)
      .then(() => setIsMovieSaved(false))
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(err)
      })
    }

    function saveMovieHandler(value) {
      const film = { 
        country: value.country,
        director: value.director,
        duration: value.duration,
        year: value.year,
        description: value.description,
        image: value.image,
        trailer: value.trailerLink,
        movieId: String(value.id),
        nameRU: value.nameRU,
        nameEN: value.nameEN,
      };
      mainApi.saveMovie(film)
        .then(() => setIsMovieSaved(true))
        .catch((err) => {
          console.log(err);
          props.showServerErrorHandler(err)
      })
  }

  function checkIsMovieSavedHander() {

  }


  function deleteOrSaveHandler(card) {
    if(isMovieSaved) {
      deleteMovieHandler();
    } else {
      saveMovieHandler();
      setIsMovieSaved(true);
    }
  }

  return (
    <li className='movie-card'>
      <div className='movie-card__container'>
        <a className='movie-card__trailer'
          href={card.trailerLink}
          target='_blank'
          rel='noreferrer'
          tooltip={`Посмотреть трейлер на Youtube`}>
            <img className='movie-card__image'
                alt={card.nameRU}
                src={`${beatfilmApiURL}${card.image.url}`} />
        </a>
        {location.pathname === '/movies' &&
          <button className={`movie-card__save-btn ${isMovieSaved ? 'movie-card__saved' : ''}`}
                  type='button' 
                  onClick={() => saveMovieHandler(card)}
                  aria-label='Сохранить'>
            {'Соxранить'}
          </button>}
        {location.pathname === '/saved-movies' &&
          <button className='movie-card__delete-btn'
                  title='Отмена сохранения'
                  type='button'
                  onClick={deleteMovieHandler}
                  aria-label='Отмена сохранения' />}
        <div className='movie-card__info'>
          <h2 className='movie-card__title'>{card.nameRU}</h2>
          <p className='movie-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
        </div>
      </div>
    </li>
  )
}

export default MovieCard;
