import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList() {
  return (
    <div className='movies-card-list'>
      <ul className='card-list'>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </ul>
      <button className='movies-card-list__more-btn'>Ещё</button>
    </div>
  )
}

export default MoviesCardList;
