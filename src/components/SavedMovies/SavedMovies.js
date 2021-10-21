import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/mainApi';
import { useContext  } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';

function SavedMovies(props) {
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const currentUser = useContext(CurrentUserContext);
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const [ movieNotFound, setMovieNotFound ] = useState(false);
  const [ backToSavedMovies, setBackToSavedMovies ] = useState(false);
  const [ updatedCardList, setUpdetedcardList ] = useState([]);

  useEffect(() => {
    props.setSavedMovies([]);
    getSavedMoviesHandler();
  }, []);

  function shortsToggler() {
    if(!isShortFilm) {
      if(shortFilmHandler(updatedCardList).length === 0) {
        setMovieNotFound(true);
      }
      props.setSavedMovies(shortFilmHandler(updatedCardList));
      setIsShortFilm(true)
    } if(isShortFilm) {
      props.setSavedMovies(updatedCardList);
      setIsShortFilm(false)
    }
  }

  function sortSavedCards(value) {
    return value.filter(item => item.owner === currentUser._id ? item : '');
  };

  function getSavedMoviesHandler() {
    mainApi.getMovies()
      .then((res) => {
        const ownersCardsFromCommonSavedValue = sortSavedCards(res.data);
        props.setSavedMovies(ownersCardsFromCommonSavedValue);
        localStorage.setItem('savedMovies', JSON.stringify(ownersCardsFromCommonSavedValue));
        setUpdetedcardList(ownersCardsFromCommonSavedValue);
      })
      .catch((err) => props.showServerErrorHandler(err))
  };

  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val);
  };

  function shortFilmHandler(value) {
    return value.filter(item => item.duration > 40 ? false : true);
  }

  function sortCards(value) {
    const sorted = value.filter(item => {
      if(item.nameRU && item.owner === currentUser._id && item.nameRU.toLowerCase().includes(localStorage.getItem('localMovieName'))) {
        return item;
      } if (item.nameEN && item.owner === currentUser._id && item.nameEN.toLowerCase().includes(localStorage.getItem('localMovieName'))) {
        return item;
      };
    });
    return sorted;
  };

  async function findInSavedMovies() {
    await preloaderToggler(true)
    await isShortFilm && props.setSavedMovies(sortCards(props.savedMovies));
    await isShortFilm && props.savedMovies.length === 0 && setMovieNotFound(true);
    await !isShortFilm && props.setSavedMovies(sortCards(JSON.parse(localStorage.getItem('savedMovies'))));
    await [!sortCards(JSON.parse(localStorage.getItem('savedMovies'))).length ? setMovieNotFound(true) : setMovieNotFound(false), setBackToSavedMovies(true)]
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
        const checked = JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => !res.message.includes(movie.nameRU));
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
        setUpdetedcardList((checked));
        localStorage.setItem('savedMovies', JSON.stringify(checked));
        if(isShortFilm) {
          props.setSavedMovies(shortFilmHandler(checked));
        } if(!isShortFilm) {
          props.setSavedMovies(checked);
        }
      })
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(err);
      })
  };
  return (
    <div className='saved-movies'>
      <SearchForm getMovieHandler={findInSavedMovies}
                  shortsToggler={shortsToggler}
                  movieNotFound={movieNotFound}
                  searchKeyword='localMovieName' 
                  isShortFilm={isShortFilm}
                  movieNotFound={movieNotFound}/>

      <MoviesCardList movies={props.savedMovies}
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