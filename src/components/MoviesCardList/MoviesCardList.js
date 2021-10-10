import MovieCard from '../MovieCard/MovieCard';

import { useLocation } from 'react-router-dom';
import { MoviesContext } from '../../contexts/contexts';
import { useContext } from 'react';


function MoviesCardList(props) {
  const movies = useContext(MoviesContext);
  const location  = useLocation();
  const localMovies = JSON.parse(localStorage.getItem('movies'));
  const uploadCardsQunt = props.screenWidth < 769 ?  2 : 3;

  function moreButtonVisibilityHandler() {
    return location.pathname !== '/saved-movies' &&
           movies.length !== 0 
           && !(movies.length === localMovies.length) 
  }

  function addMoreMovies() {
    const num = movies.length;
    for(let i = num; i < num + uploadCardsQunt; i++) {
      if(localMovies[i]){
        props.setMovies(movies => [...movies, localMovies[i]]);
      }
    } 
  }

  return (
    <div className='movies-card-list'>
      <ul className='movie-card-list__catalog'>{
        
        movies.map(item =>  {
          return <MovieCard card = {item} 
                            key = {item.id}/>})
      }</ul>
          {movies.length === 0 && !props.isPreloaderShowing && <h1 className='movie-card-list__missing-content-msg'>Ничего не найдено</h1>}
      {moreButtonVisibilityHandler()  &&<button className='movies-card-list__more-btn' type='button' onClick={addMoreMovies}>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;