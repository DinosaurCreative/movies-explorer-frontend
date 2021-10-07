import { useState } from 'react';
import { Form, Field, SubmitButton, errorMessageHandler, errorStatusHandler } from '../../utils/Forms';
import validators from '../../utils/validators';
import { errors } from '../../utils/constants'
function SearchForm() {
  const [movieError, setMovieError ] = useState(false);

  const errorSpanHandler = (prop, status) => {
    if (prop === 'userMovie') {
      setMovieError(status);
      return;
    }
  }

  return (
    <div className='search-form__container'>
      <Form className='search-form'
            type='submit'
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
                     onChange={(e) => onChange(e.target.value)} />)
                     
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
                      className={`${props.className} ${disabled && 'search-form__button_type_disabled'}`}/>)
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