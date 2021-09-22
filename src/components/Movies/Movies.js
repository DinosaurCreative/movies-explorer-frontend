import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
      { false && <Preloader />}
      
    </div>
  )
}

export default Movies;
