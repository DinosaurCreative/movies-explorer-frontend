import MovieCard from '../MovieCard/MovieCard';
/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { MoviesContext } from '../../contexts/contexts';
import { useContext, useState } from 'react';


function MoviesCardList(props) {
  const movies = useContext(MoviesContext);
  const location  = useLocation();
  const localMovies = JSON.parse(localStorage.getItem('movies'));
  const [ isButtonHidden, setIsButtonHidden ] = useState(false);
  const addMoreMovies = () => {
    const num = movies.length;
    for(let i = num; i < num + 3; i++) {
      if(localMovies[i]){
        props.setMovies(movies => [...movies, localMovies[i]]);
      }
      if(localMovies.length === ++movies.length) {
        setIsButtonHidden(true)
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
      {location.pathname !== '/saved-movies' &&
       movies.length !== 0 &&
      !isButtonHidden &&
        <button className='movies-card-list__more-btn' disabled={movies.length === 0} type='button' onClick={addMoreMovies}>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;