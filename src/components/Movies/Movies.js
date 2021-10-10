import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <div className='movies'>
      <SearchForm setMovies={props.setMovies}
                  showServerErrorHandler={props.showServerErrorHandler}
                  setDesiredMovie={props.setDesiredMovie}
                  screenWidth={props.screenWidth}
                  setIsPreloaderShowing={props.setIsPreloaderShowing}/>
      <MoviesCardList setMovies={props.setMovies} 
                      screenWidth={props.screenWidth}
                      isPreloaderShowing={props.isPreloaderShowing}/>
      { props.isPreloaderShowing && <Preloader />}
    </div>
  )
}

export default Movies;
