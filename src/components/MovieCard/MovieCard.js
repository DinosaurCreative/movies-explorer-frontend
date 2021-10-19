import { useLocation } from 'react-router';
import { beatfilmApiURL } from '../../utils/constants';
import mainApi from '../../utils/mainApi';
import { errors } from '../../utils/constants';

function MovieCard(props) {
  const location = useLocation();
  const { card } = props;

  function deleteMovieHandler() {
    props.deleteMovieHandler(card);
  };


  function sortCards(value, length) {
    const backVal = [];
    for (let i = 0; i < length; i++) {
      backVal.push(value[i]);
    }
    return backVal;
  }


  function saveMovieHandler() {
    const film = { 
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image:  beatfilmApiURL + card.image.url,
      trailer: card.trailerLink,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      movieId: String(card.id),
    };

    mainApi.saveMovie(film)
      .then((res) => {
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        localMovies.forEach((movie) => {
          if (movie.id === Number(res.data.movieId)) {
            movie.saved = true;
            movie._id = res.data._id;
            props.setSavedMovies(savedMovies => [...savedMovies, movie ])
          };
        });
        localStorage.setItem('movies', JSON.stringify(localMovies));
        props.setMovies(sortCards(localMovies, props.movies.length));
      })
      .catch((err) => {
        console.log(err);
        props.showServerErrorHandler(errors.loginFail);
      })
    };

  return (
    <li className='movie-card'>
      <div className='movie-card__container'>
        <a className='movie-card__trailer'
          href={card.trailerLink || card.trailer}
          target='_blank'
          rel='noreferrer'
          tooltip={`Посмотреть трейлер на Youtube`}>
            <img className='movie-card__image'
                alt={card.nameRU}
                src={typeof card.image === 'string' ? card.image : beatfilmApiURL + card.image.url} />
        </a>
        {location.pathname === '/movies' &&
          <button className={`movie-card__save-btn ${card.saved ? 'movie-card__saved' : ''}`}
                  type='button'
                  onClick={card.saved ? deleteMovieHandler : saveMovieHandler }
                  aria-label='Сохранить'>
            {'Соxранить'}
          </button>}
        {location.pathname === '/saved-movies' &&
          <button className='movie-card__delete-btn'
                  title='Отмена сохранения'
                  type='button'
                  onClick={deleteMovieHandler}
                  aria-label='Отмена сохранения' />}
        <div className='movie-card__info'>
          <h2 className='movie-card__title'>{card.nameRU}</h2>
          <p className='movie-card__duration'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
