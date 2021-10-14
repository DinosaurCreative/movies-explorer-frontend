/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { errors } from '../../utils/constants'
import movieApi from '../../utils/movieApi';
import mainApi from '../../utils/movieApi';

function Movies(props) {
  const localMovies = JSON.parse(localStorage.getItem('movies'));
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const [ movieNotFound, setMovieNotFound ] = useState(false);

  useEffect(() => {
    props.setMovies([]);
    if(localMovies) {
      localMoviesHandler(localMovies);
    }
  }, [])
  function saveMovie(data) {
    mainApi.saveMovie(data) 

    
  }

  function localMoviesHandler(value) {
    if(value) {
      for(let i = 0; i < value.length && i < props.uploadingCards; i++) {
        props.setMovies(movies => [...movies, value[i]])
      }
    }
  }

  function errorHandler(err) {
    props.showServerErrorHandler(err)
  }

  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val)
  }

  function shortFilmHandler(value) {
    if(!isShortFilm) {
      return true;
    }
    return value.duration > 40 ? false : true;
  }

  function sortCards(value) {
    const sorted = value.filter(item => {
      if(item.nameRU && shortFilmHandler(item) && item.nameRU.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      } if (item.nameEN && shortFilmHandler(item) && item.nameEN.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      }
    })
    return sorted;
  }

  function getMovieHandler() {
    preloaderToggler(true);
    Promise.all([props.setMovies([]), localStorage.removeItem('movies')])
      .then(() => {
        movieApi.getMovies()
          .then((res) => {
            localStorage.setItem('movies', JSON.stringify(sortCards(res)));
          })
          .then(() => {
            const localMovies = JSON.parse(localStorage.getItem('movies'));
            localMoviesHandler(localMovies);
            return localMovies
          })
          .then((res) => { 
            !res.length ? setMovieNotFound(true) : setMovieNotFound(false);
          })
          .catch((err) => {
            console.log(err);
            errorHandler(errors.serverResponseErr);
          }) 
      })
      .catch((err) => {
        console.log(err);
        errorHandler(err);
      })
      .finally(() => preloaderToggler(false))
  }

  function moreButtonVisibilityHandler() {
    return props.movies.length !== 0 &&
           !(props.movies.length === localMovies.length)
  }

  function addMoreMovies() {
    const num = props.movies.length;
    for(let i = num; i < num + props.uploadCardsQunt; i++) {
      if(localMovies[i]){
        props.setMovies(movies => [...movies, localMovies[i]]);
      }
    }
  }

  return (
    <div className='movies'>
      <SearchForm setMovies={props.setMovies}
                  showServerErrorHandler={props.showServerErrorHandler}
                  setDesiredMovie={props.setDesiredMovie}
                  screenWidth={props.screenWidth}
                  setIsPreloaderShowing={props.setIsPreloaderShowing}
                  getMovieHandler={getMovieHandler}
                  isShortFilm={isShortFilm}
                  setIsShortFilm={setIsShortFilm}/>

      <MoviesCardList setMovies={props.setMovies}
                      screenWidth={props.screenWidth}
                      isPreloaderShowing={props.isPreloaderShowing}
                      movies={props.movies}
                      showServerErrorHandler={props.showServerErrorHandler}
                      movieNotFound={movieNotFound}
                      savedMovies={props.savedMovies}>
          {moreButtonVisibilityHandler() && <button className='movies-card-list__more-btn' type='button' onClick={addMoreMovies}>Ещё</button>}
          </MoviesCardList>
      {props.isPreloaderShowing && <Preloader />}
    </div>
  )
}

export default Movies;
