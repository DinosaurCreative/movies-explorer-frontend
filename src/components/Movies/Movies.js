import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { errors } from '../../utils/constants'
import movieApi from '../../utils/movieApi';
import mainApi from '../../utils/mainApi';
import { isURL } from 'validator';

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

  function localMoviesHandler(value) {
    if(value) {
      for(let i = 0; i < value.length && i < props.uploadingCards; i++) {
        props.setMovies(movies => [...movies, value[i]])
      }
    }
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

  function checkIncomingValueValidityHandler(values) {
    return values.map((item) => {
      item.saved = false;
      checkIsMovieSavedHandler(item);
      for( let i in item) {
        if (item[i] === null) {
          item[i] = 'Значение отсутствует';
        } if (i === 'trailerLink') {
          if (!isURL(item[i])){
            item[i] = `https://www.youtube.com/results?search_query=${item.nameEN.replaceAll(' ', '+')}`;
          }
        }
      }
      return item;
    }
  )}

  function checkIsMovieSavedHandler(item) {
    props.savedMovies.forEach((movie) => {
      if(item.id === Number(movie.movieId)) {
        item._id = movie._id;
        item.saved = true;
        return;
      }
    })
  }

  function sortDeletedCards(value, length) {
    const backVal = [];
    for (let i = 0; i < length; i++) {
      backVal.push(value[i]);
    }
    return backVal;
  }

  function deleteMovieHandler(card) {
    mainApi.deleteMovie(card._id)
      .then((res) => {
        const checked = props.savedMovies.filter((movie) =>  !res.message.includes(movie.nameRU));
        const deleted = props.savedMovies.filter((movie) =>  res.message.includes(movie.nameRU));
        const localMovies = JSON.parse(localStorage.getItem('movies'));

        localMovies.forEach((movie) => {
          if (movie.id === deleted[0].id || movie.id === Number(deleted[0].movieId)) {
            movie.saved = false;
            movie._id = '';
          }
          localStorage.setItem('movies', JSON.stringify(localMovies));
          props.setMovies(sortDeletedCards(localMovies, props.movies.length));
        })
        props.setSavedMovies(checked);
      })
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(errors.serverResponseErr);
      })
    };

  function getMovieHandler() {
    Promise.all([props.setMovies([]), localStorage.removeItem('movies'), preloaderToggler(true)])
      .then(() => {
        movieApi.getMovies()
          .then((res) => {
            return localStorage.setItem('movies', JSON.stringify(checkIncomingValueValidityHandler(sortCards(res))));
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
            props.showServerErrorHandler(errors.serverResponseErr);

          })
          .finally(() => preloaderToggler(false))
      })
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(errors.serverResponseErr);
      })
  };

  function moreButtonVisibilityHandler() {
    return props.movies.length !== 0 &&
           !(props.movies.length === localMovies.length)
  };

  function addMoreMovies() {
    const num = props.movies.length;
    for(let i = num; i < num + props.uploadCardsQunt; i++) {
      if(localMovies[i]){
        props.setMovies(movies => [...movies, localMovies[i]]);
      };
    };
  };

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
                      savedMovies={props.savedMovies}
                      setSavedMovies={props.setSavedMovies}
                      localMoviesHandler={localMoviesHandler}
                      deleteMovieHandler={deleteMovieHandler}>
          {moreButtonVisibilityHandler() && <button className='movies-card-list__more-btn' type='button' onClick={addMoreMovies}>Ещё</button>}
          </MoviesCardList>
      {props.isPreloaderShowing && <Preloader />}
    </div>
  );
};

export default Movies;
