import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { errors } from '../../utils/constants'
import movieApi from '../../utils/movieApi';
import { MoviesContext } from '../../contexts/contexts';
import { useContext } from 'react';

function Movies(props) {
  const movies = useContext(MoviesContext);
  const localMovies = JSON.parse(localStorage.getItem('movies'));
  const [ isShortFilm, setIsShortFilm ] = useState(false);
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
    preloaderToggler(true)
    Promise.all([props.setMovies([]), localStorage.removeItem('movies')])
      .then(() => {
        movieApi.getMovies()
          .then((res) => {
            localStorage.setItem('movies', JSON.stringify(sortCards(res)));
          })
          .then(() => {
            const localMovies =  JSON.parse(localStorage.getItem('movies'));
            localMoviesHandler(localMovies);
          })
          .catch((err) => {
            console.log(err);
            errorHandler(errors.serverResponseErr);
          })
          .finally(() => preloaderToggler(false))
      })
      .catch((err) => {
        console.log(err);
        errorHandler(err);
      })
  }

  function moreButtonVisibilityHandler() {
    return movies.length !== 0 &&
           !(movies.length === localMovies.length) 
  }

  function addMoreMovies() {
    const num = movies.length;
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
                      movies={movies}>{
          moreButtonVisibilityHandler()  && <button className='movies-card-list__more-btn' type='button' onClick={addMoreMovies}>Ещё</button>
      }</MoviesCardList>
      { props.isPreloaderShowing && <Preloader />}
    </div>
  )
}

export default Movies;
