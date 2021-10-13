import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList(props) {

  return (
    <div className='movies-card-list'>
      <ul className='movie-card-list__catalog'>{
        props.movies.map(item => {
          return <MovieCard card={item} 
                            key={item.id}
                            movies={props.movies}
                            showServerErrorHandler={props.showServerErrorHandler} />})
      }</ul>
      {props.movies.length === 0 && !props.isPreloaderShowing && <h1 className='movie-card-list__missing-content-msg'>Ничего не найдено</h1>}
      {props.children}
    </div>
  )
}

export default MoviesCardList;