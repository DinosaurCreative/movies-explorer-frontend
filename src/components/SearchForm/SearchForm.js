/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import { Form, Field, SubmitButton, errorMessageHandler, errorStatusHandler } from '../../utils/Forms';
import validators from '../../utils/validators';
import { errors } from '../../utils/constants'
import movieApi from '../../utils/movieApi';
import { MoviesContext } from '../../contexts/contexts';


function SearchForm(props) {
  const [movieError, setMovieError ] = useState(false);
  // const movies = useContext(MoviesContext);
  const uploadingCards = props.screenWidth < 480 ? 5 : props.screenWidth < 769 ? 8 : 12;

  function localMoviesHandler(value) {
    // const localStorageMov =  JSON.parse(localStorage.getItem('movies'));
    if(value) {
      for(let i = 0; i < value.length && i < uploadingCards; i++) {
        props.setMovies(movies => [...movies, value[i]])
      }
    }
  }

  useEffect(() => {
    props.setMovies([]);
    const localStorageMov =  JSON.parse(localStorage.getItem('movies'));
    if(localStorageMov) {
      localMoviesHandler(localStorageMov);
    }
  }, [])

  function setToLocalStorege(value) {
    localStorage.setItem('movieName', value.toLowerCase());
  }
  
  function errorHandler(err) {
    props.showServerErrorHandler(err)
  }

  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val)
  }
  
  // function sortCards2(value) {
  //   return value.filter(item => item.nameRU.toLowerCase().includes(localStorage.getItem('movieName')));
  // }

  function sortCards(value) {
    const sorted = value.filter(item => {
      if(item.nameRU && item.nameRU.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      } if (item.nameEN && item.nameEN.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      }
    })

    return sorted;
  }
  
  function getMovieHandler() {
    preloaderToggler(true)
    Promise.all([props.setMovies([]), localStorage.removeItem('movies')])
      .then(() => {
        movieApi.getMovies()
          .then((res) => {
            localStorage.setItem('movies', JSON.stringify(sortCards(res)));
          })
          .then(() => {
            const localStorageMov =  JSON.parse(localStorage.getItem('movies'));
            localMoviesHandler(localStorageMov)
          })
          .catch((err) => {
            console.log(err);
            errorHandler(errors.serverResponseErr);
          })
          .finally(() => preloaderToggler(false))
      })
      .catch((err) => {
        console.log(err);
        errorHandler(err);
      })
  }

  function errorSpanHandler(prop, status) {
    if (prop === 'userMovie') {
      setMovieError(status);
    }
  }

  return (
    <div className='search-form__container'>
      <Form className='search-form'
            type='submit'
            onSubmit={getMovieHandler}
            validators={validators}>
        <div className='search-form__input-container' >
        <Field className='search-form__input'
               placeholder='Фильм'
               name='userMovie'
               type='text'>
          {({ onChange, ...props }) => {
            return (<input
              placeholder={props.placeholder}
              className={`${props.className} ${errorStatusHandler(props) && 'serch-form__input_type_error'}`}
              onFocus={() => errorSpanHandler(props.name, true)}
              onBlur={() => errorSpanHandler(props.name, false)}
              onChange={(e) => {
                onChange(e.target.value);
                setToLocalStorege(e.target.value);
              }} />)
              
            }}
        </Field>
        <Field name='userMovie'
               className='search-form__error-span'
               errorslist={{
                 required: errors.required,
                }}>
          {(props) => {
            return (<span {...props} 
              className = {`${props.className} ${!movieError && 'search-form__error-span_type_hidden'}`}>{errorMessageHandler(props)}</span>)
            }}</Field>
        
        
        </div>    
        <SubmitButton className='search-form__button'
               type='submit'>{
                 ({ disabled, ...props }) => {
                   return (<button 
                    {...props}
                    type={'submit'}
                    className={`${props.className}  ${disabled && 'search-form__button_type_disabled'}`}
                    disabled={disabled}
                    />)
                  }
                }</SubmitButton>
        <div className='search-form__border' />
        <div className='search-form__checkbox-container'>
          <input className='search-form__checkbox' type='checkbox' />
          <p className='search-form__checkbox-caption'>Короткометражки</p>
        </div>
      </Form>
  </div>
  )
 }

export default SearchForm;