import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import { errors, photos } from '../../utils/constants'
import mainApi from '../../utils/mainApi';

function SavedMovies(props) {
  // const [ userMovies, setUserMovies ] = useState(photos);
  // function preloaderToggler(val) {
  //   props.setIsPreloaderShowing(val);
  // }

  // useEffect(() => {
  //   getSavedMovies();
  // }, [])

  // function getSavedMovies() {
  //   preloaderToggler(true);
  //   Promise.resolve([setUserMovies([])])
  //     .then(() => {
  //       mainApi.getMovies()
  //         .then((res) => {
  //           setUserMovies(res);
  //           console.log(res, 111);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           props.showServerErrorHandler(err);
  //         })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       props.showServerErrorHandler(err);
  //     })
  //     .finally(() => preloaderToggler(false))
  // }
  // console.log(props.data.savedMovies)
  return (
    <div className='saved-movies'>
      <SearchForm /* getMovieHandler={getSavedMovies} *//>

      <MoviesCardList movies={props.savedMovies} />
      { props.isPreloaderShowing && <Preloader />}
    </div>
  )
}

export default SavedMovies;