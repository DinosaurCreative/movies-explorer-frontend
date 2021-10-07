import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, SubmitButton, errorStatusHandler, errorMessageHandler } from '../../utils/Forms';
import validators from '../../utils/validators';

function Register() {
  const [emailError, setEmailError ] = useState(false);
  const [passwordError, setPasswordError ] = useState(false);
  const [nameError, setNameError ] = useState(false);

  const errorSpanHandler = (prop, status) => {
    if (prop === 'userEmail') {
      setEmailError(status);
      return;
    }
    if (prop === 'userPassword') {
      setPasswordError(status);
      return;
    }
    if (prop === 'userName') {
      setNameError(status);
    }
  }
  
  return (
    <div className='register'>
      <div className='form__container'>
      <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>Добро пожаловать!</h1>
        <Form className='form'
                type='submit'
                // onSubmit={e => console.log(e)}
                // onChange={e => console.log(e)}
                validators={validators}>
          <Field className='form__name-span'>
            {(props) => <span {...props}>Имя</span>}
          </Field>


          <Field className='form__input'
                 name='userName'
                 type='text'>
            {({ onChange, ...props }) => {
              return (<input 
                className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`} 
                onFocus={() => errorSpanHandler(props.name, true)}
                onBlur={() => errorSpanHandler(props.name, false)}
                onChange={(e) => onChange(e.target.value)} />)
            }}
          </Field>
          
          
          <Field className='form__error-span'
                 name='userName'
                 errorslist={{
                  required: 'Поле не должно быть пустым.',                      
                  minLength: 'Длина имени не может быт короче двух символов.',
                }}>
            {(props) => {
              return (<span {...props} 
                className={`${props.className} ${!nameError && 'form__error-span_type_hidden'}`}>
                {errorMessageHandler(props)}
                </span>)              
            }}
          </Field>
          <Field className='form__name-span'>
            {(props) => <span {...props}>E-mail</span>}
          </Field>

          <Field name='userEmail'
                  className='form__input'
                  type='email'>

          {({ onChange, ...props}) => { 
            return (<input 
                      className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`} 
                      onFocus={() => errorSpanHandler(props.name, true)}
                      onBlur={() => errorSpanHandler(props.name, false)}
                      onChange={(e) => onChange(e.target.value)} />)
          }}
          </Field>

          <Field className='form__error-span'
                 name='userEmail'
                 errorslist={{
                   required: 'Поле не должно быть пустым.',                      
                   isValidEmail: 'Введен некорректный имейл.',
                 }}>
            {(props) => {
              return (<span {...props} 
                className={`${props.className} ${!emailError && 'form__error-span_type_hidden'}`}>{errorMessageHandler(props)}</span>)
            }}
          </Field>

          <Field className='form__name-span'>
            {(props) => <span {...props}>Пароль</span>}
          </Field>

          <Field name='userPassword'
                  className='form__input'
                  type='password'>
            {({ onChange, ...props}) => {
              return (<input {...props} 
                      className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`} 
                      onChange={(e) => onChange(e.target.value)} 
                      onFocus={() => errorSpanHandler(props.name, true)} 
                      onBlur={() => errorSpanHandler(props.name, false)}/>)
            }}</Field>
          
          <Field name='userPassword'
                  className='form__error-span'
                  errorslist={{
                    required: 'Поле не должно быть пустым',
                    minLength: 'Длина пароля должна быть более восьми символов.',
                  }}>
            {(props) => {
              return (<span {...props} 
                      className={`${props.className} ${!passwordError && 'form__error-span_type_hidden'}`}>
                      {errorMessageHandler(props)}
                      </span>)
          }}</Field>

           <SubmitButton className='form__button form__button_place_register'
                         type='submit'>{
            ({ disabled , ...props}) => {
              return (<button {...props} 
                      className={`${props.className} ${disabled && 'form__button_type_disabled'}`}>
                      {'Зарегистрироваться'}
                      </button>)
           }}</SubmitButton> 

        </Form>
        <p className='from__status-ask'>Уже зарегистрированы?{<Link to='/signin' className='link link_place_form link_place_form-registration'>Войти</Link>}</p>
      </div>
    </div>
  )
}

export default Register;
