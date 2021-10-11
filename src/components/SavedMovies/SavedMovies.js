import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';

import { errors, photos } from '../../utils/constants'

function SavedMovies() {
  const [userMovies,  setUserMovies ] = useState([]);
  function getSavedMovies() {

  }

  return (
    <div className='saved-movies'>
      <SearchForm getMovieHandler={getSavedMovies}/>

      <MoviesCardList movies={photos} />
    </div>
  )
}

export default SavedMovies;