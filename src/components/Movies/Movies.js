import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <div className='movies'>
      <SearchForm setMovies={props.setMovies}
                  showServerErrorHandler={props.showServerErrorHandler}
                  setDesiredMovie={props.setDesiredMovie} />
      <MoviesCardList setMovies={props.setMovies} />
      { false && <Preloader />}
    </div>
  )
}

export default Movies;
