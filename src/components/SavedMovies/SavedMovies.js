import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/mainApi';

function SavedMovies(props) {
  const [ movieNotFound, setMovieNotFound ] = useState(false);
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const currentUserId = localStorage.getItem('userId');

  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val);
  };

  function shortFilmHandler(value) {
    if(!isShortFilm) {
      return true;
    };
    return value.duration > 40 ? false : true;
  };

  function sortCards(value) {
    const sorted = value.filter(item => {
      if(item.nameRU && shortFilmHandler(item) && item.owner === currentUserId && item.nameRU.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      } if (item.nameEN && shortFilmHandler(item) && item.owner === currentUserId && item.nameEN.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      };
    });
    return sorted;
  };

  function findInSavedMovies() {
    Promise.resolve([props.setSavedMovies([]), preloaderToggler(true)])
      .then(() => {
        mainApi.getMovies()
          .then((res) => {
            props.setSavedMovies(sortCards(res.data))
            return res.data;
          })
          .then((res) => {
            !sortCards(res).length ? setMovieNotFound(true) : setMovieNotFound(false);
            props.setBackToSavedMovies(true);
          })
          .catch((err) => {
            console.log(err);
            props.showServerErrorHandler(err);
          })
          .finally(() => preloaderToggler(false))
      })
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(err);
      })
  };

  function hideResetButtonHendler() {
    props.setBackToSavedMovies(false);
    props.setIsResetButtonPushed(true);
  };

  function deleteMovieHandler(card) {
    mainApi.deleteMovie(card._id)
      .then((res) => {
        const checked = props.savedMovies.filter((movie) => !res.message.includes(movie.nameRU));
        const deleted = props.savedMovies.filter((movie) => res.message.includes(movie.nameRU));
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        props.setMovies([]);
        localMovies.forEach((movie) => {
          if (movie.id === deleted[0].id || movie.id === Number(deleted[0].movieId)) {
            movie.saved = false;
            movie._id = '';
            props.setMovies(movies => [ ...movies, movie ]);
          };
          localStorage.setItem('movies', JSON.stringify(localMovies));
          props.setMovies(localMovies);
        })
        props.setSavedMovies(checked);
      })
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(err);
      })
  };

  return (
    <div className='saved-movies'>
      <SearchForm getMovieHandler={findInSavedMovies}
                  setIsShortFilm={setIsShortFilm}
                  isShortFilm={isShortFilm}
                   />

      <MoviesCardList movies={props.savedMovies}
                      savedMovies={props.savedMovies}
                      setSavedMovies={props.setSavedMovies}
                      setMovies={props.setMovies}
                      deleteMovieHandler={deleteMovieHandler} 
                      backToSavedMovies={props.backToSavedMovies}
                      hideResetButtonHendler={hideResetButtonHendler} 
                      movieNotFound={movieNotFound}/>
      { props.isPreloaderShowing && <Preloader />}
    </div>
  )
};

export default SavedMovies;