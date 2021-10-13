import { Form } from '../../utils/Forms';
import validators from '../../utils/validators';
import { Field, SubmitButton, errorMessageHandler, errorStatusHandler } from '../../utils/Forms';
import { useState } from 'react';
import { errors } from '../../utils/constants'

function SearchForm(props) {
  const [movieError, setMovieError ] = useState(false);

  function errorSpanHandler(prop, status) {
    if (prop === 'userMovie') {
      setMovieError(status);
    }
  }

  function shortFilmHandler() {
    props.setIsShortFilm(!props.isShortFilm);
  }

  function setToLocalStorege(value) {
    localStorage.setItem('movieName', value.toLowerCase());
  }

  return (
    <div className='search-form__container'>
      <Form className='search-form'
            type='submit'
            onSubmit={props.getMovieHandler}
            validators={validators}>
        <div className='search-form__input-container'>
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
                  }} />);
              }}
            </Field>
            <Field name='userMovie'
              className='search-form__error-span'
              errorslist={{
                required: errors.required,
              }}>
              {(props) => {
                return (<span {...props}
                  className={`${props.className} ${!movieError && 'search-form__error-span_type_hidden'}`}>{errorMessageHandler(props)}</span>);
              } }</Field>
          </div><SubmitButton className='search-form__button'
            type='submit'>{({ disabled, ...props }) => {
              return (<button
                {...props}
                type={'submit'}
                className={`${props.className} ${disabled && 'search-form__button_type_disabled'}`}
                disabled={disabled} />);
            } }</SubmitButton>
        <div className='search-form__border' />
        <div className='search-form__checkbox-container'>
          <input className='search-form__checkbox' onClick={shortFilmHandler} type='checkbox' />
          <p className='search-form__checkbox-caption'>Короткометражки</p>
        </div>
      </Form>
    </div>
  )
}

export default SearchForm;