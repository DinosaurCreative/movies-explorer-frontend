import MovieCard from '../MovieCard/MovieCard';
import { photos } from '../../utils/constants';

import { useLocation } from 'react-router-dom';
function MoviesCardList() {
  const location  = useLocation();
  console.log(photos[0])
  return (
    <div className='movies-card-list'>
      <ul className='movie-card-list__catalog'>{
        photos.map(item =>  <MovieCard card = {item} 
                                       key = {item}
        />)
      }</ul>
      {location.pathname !== '/saved-movies' &&<button className='movies-card-list__more-btn'>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;