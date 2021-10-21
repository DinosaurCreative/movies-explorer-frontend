import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/mainApi';
import { useContext  } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';

function SavedMovies(props) {
  const currentUser = useContext(CurrentUserContext);
  const [ movieNotFound, setMovieNotFound ] = useState(false);
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const [ backToSavedMovies, setBackToSavedMovies ] = useState(false);

  useEffect(() => {
    props.setSavedMovies([])
    getSavedMoviesHandler();
  }, [])

  function sortSavedCards(value) {
    return value.filter(item => item.owner === currentUser._id ? item : '');
  };

  function getSavedMoviesHandler() {
    mainApi.getMovies()
      .then((res) => {
        const ownersCardsFromCommonSavedValue = sortSavedCards(res.data);
        props.setSavedMovies(ownersCardsFromCommonSavedValue);
        localStorage.setItem('savedMovies', JSON.stringify(ownersCardsFromCommonSavedValue));
      })
      .catch((err) => props.showServerErrorHandler(err))
  };

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
      if(item.nameRU && shortFilmHandler(item) && item.owner === currentUser._id && item.nameRU.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      } if (item.nameEN && shortFilmHandler(item) && item.owner === currentUser._id && item.nameEN.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      };
    });
    return sorted;
  };

  async function findInSavedMovies() {
    await [props.setSavedMovies([]), preloaderToggler(true)]
    await props.setSavedMovies(sortCards(savedMovies))
    await [!sortCards(savedMovies).length ? setMovieNotFound(true) : setMovieNotFound(false), setBackToSavedMovies(true)]
    await preloaderToggler(false)
  };

  function hideResetButtonHendler() {
    setBackToSavedMovies(false);
    props.setIsResetButtonPushed(true);
    props.setSavedMovies(savedMovies);
  };

  function deleteMovieHandler(card) {
    mainApi.deleteMovie(card._id)
      .then((res) => {
        const checked = props.savedMovies.filter((movie) => !res.message.includes(movie.nameRU));
        const deleted = props.savedMovies.filter((movie) => res.message.includes(movie.nameRU));
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        props.setMovies([])
        if(localMovies) {
          localMovies.forEach((movie) => {
            if (movie.id === deleted[0].id || movie.id === Number(deleted[0].movieId)) {
              movie.saved = false;
              movie._id = '';
              props.setMovies(movies => [ ...movies, movie ]);
            };
            localStorage.setItem('movies', JSON.stringify(localMovies));
            props.setMovies(localMovies);
          })
        }
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
                      // savedMovies={props.savedMovies}
                      setSavedMovies={props.setSavedMovies}
                      setMovies={props.setMovies}
                      deleteMovieHandler={deleteMovieHandler} 
                      backToSavedMovies={backToSavedMovies}
                      hideResetButtonHendler={hideResetButtonHendler} 
                      movieNotFound={movieNotFound}/>
      { props.isPreloaderShowing && <Preloader />}
    </div>
  )
};

export default SavedMovies;