import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { errors } from '../../utils/constants'
import movieApi from '../../utils/movieApi';
import mainApi from '../../utils/mainApi';
import { isURL } from 'validator';

function Movies(props) {
  const localMovies = JSON.parse(localStorage.getItem('movies')); // фильмы сохраненные по запросу ключевым словом
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const [ movieNotFound, setMovieNotFound ] = useState(false);
  const beatFilmBase = JSON.parse(localStorage.getItem('beatFilmBase'));
  const [ currentCardArrayLength, setCurrentArrayLength ] = useState();

  useEffect(() => {
    props.setMovies([]);
    toggleShortHandler(localMovies);
  }, [isShortFilm])
  

//  отрисовывает карточки в зависимости от положения тоглера. Так же при старте страницы отрисовывает данные из localStorage
  function toggleShortHandler(value) {
    if(!localMovies) return
    if(isShortFilm) {
      localMoviesHandler(shortFilmHandler(sortCards(value)));
      return
    }
    // выводит на экран фильмы отсортированные по ключевому слову.
    localMoviesHandler(sortCards(value))
  }

  function localMoviesHandler(value) {
    setCurrentArrayLength(value.length);  // устанавлиывает длину массива с карточками, что бы скрытвать или отбражать кнопку "еще"
    if(value) {
      for(let i = 0; i < value.length && i < props.uploadingCards; i++) {
        props.setMovies(movies => [...movies, value[i]])
      }
    }
  }
  /// тоглит прелоадер
  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val)
  }
  //  определяет попадает ли в категорию короткого метра
  function shortFilmHandler(value) {
    return value.filter(item => item.duration > 40 ? false : true);
  }

  // сортирует базу бтфильма по ключевому слову и отдает результат^ смотрит в английском и руском именах.
  function sortCards(value) {
    const sorted = value.filter(item => {
      if(item.nameRU && item.nameRU.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      } if (item.nameEN && item.nameEN.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      }
    })

    return sorted;
  }
  // проверяет пришедшие данные с сервака перед упаковкой в локалный сторадж
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
  // Проверяет сохранен ли фильм
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
      const deleted = props.movies.filter((movie) =>  res.message.includes(movie.nameRU));  /// та которую удалили
      const checked = props.movies.filter((movie) =>  !res.message.includes(movie.nameRU)); /// те что остались
      const localMovies = JSON.parse(localStorage.getItem('movies'));  ///достаю сохраненные по ключевому слову фильмы
      
        localMovies.forEach((movie) => { ///прохожу по ключевым фильмам
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

  async function getMovieHandler() {
    if(beatFilmBase) {
      try {
        await [props.setMovies([]), localStorage.removeItem('movies'), preloaderToggler(true)];
        await localStorage.setItem('movies', JSON.stringify(checkIncomingValueValidityHandler(sortCards(beatFilmBase))));
        const localMovies = await JSON.parse(localStorage.getItem('movies'));
        await console.log(localMovies)
        await toggleShortHandler(localMovies);
        await localMovies ? setMovieNotFound(true) : setMovieNotFound(false);
      } finally {
        await preloaderToggler(false);
      }

      return
    }
    
    try {
      await [props.setMovies([]), localStorage.removeItem('movies'), preloaderToggler(true)];
      const response = await  movieApi.getMovies();
      await localStorage.setItem('beatFilmBase', JSON.stringify(response));
      await localStorage.setItem('movies', JSON.stringify(checkIncomingValueValidityHandler(sortCards(response))));
      const localMovies = await JSON.parse(localStorage.getItem('movies'));
      await localMoviesHandler(localMovies);
      await localMovies.length > 0 ? setMovieNotFound(true) : setMovieNotFound(false);
    } catch (err){
      console.log(err);
      props.showServerErrorHandler(errors.serverResponseErr);
    } finally {
      await preloaderToggler(false);
    }
  };

  function moreButtonVisibilityHandler() {
    const  status = currentCardArrayLength !== 0 && props.movies.length && !(props.movies.length === currentCardArrayLength)
    return Boolean(status);
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
          { moreButtonVisibilityHandler() && <button className='movies-card-list__more-btn' type='button' onClick={addMoreMovies}>Ещё</button>}
          </MoviesCardList>
      {props.isPreloaderShowing && <Preloader />}
    </div>
  );
};

export default Movies;
