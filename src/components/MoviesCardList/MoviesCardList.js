import MovieCard from '../MovieCard/MovieCard';
import middleofnowhere from '../../images/middleofnowhere.jpg';
import stones from '../../images/stones.jpg';
import eveningfrance from '../../images/eveningfrance.jpg';
import sameplace from '../../images/sameplace.jpg';
import { useLocation } from 'react-router-dom';
function MoviesCardList() {
  const location  = useLocation();

  return (
    <div className='movies-card-list'>
      <ul className='movie-card-list__catalog'>
        <MovieCard card = {middleofnowhere}
        />
        <MovieCard card = {stones}
        />
        <MovieCard card = {eveningfrance}
        />
        {/* <MovieCard card = {sameplace}
        />
        <MovieCard card = {middleofnowhere}
        />
        <MovieCard card = {stones}
        />
        <MovieCard card = {eveningfrance}
        />
        <MovieCard card = {sameplace}
        /> */}
        {/* <MovieCard card = {middleofnowhere}
        />
        <MovieCard card = {stones}
        />
        <MovieCard card = {eveningfrance}
        />
        <MovieCard card = {sameplace}
        /> */}
      </ul>
      {location.pathname !== '/saved-movies' &&<button className='movies-card-list__more-btn'>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;
