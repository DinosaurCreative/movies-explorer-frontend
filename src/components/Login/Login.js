import { Link } from 'react-router-dom';
import validator from 'validator';
import { useState } from 'react';
import { Form, Field, SubmitButton } from '../../utils/Forms';
 
function Login() {
  const [emailError, setEmailError ] = useState(false);
  const [passwordError, setPasswordError ] = useState(false);


  const errorMessageHandler = (props) => {
    for (const name in props.errors) {
      if(props.errors[name]) {
        return props.errorslist[name];
      }
    }  
  }

  const errorStatusHandler = (props) => {
    for(const name in props.errors) {
      if(props.errors[name]) {
        return true;
      }
    }
    return false;
  }

  const errorSpanHandler = (prop, status) => {
    if (prop === 'userEmail') {
      setEmailError(status);
      return;
    }
    if (prop === 'userPassword') {
      setPasswordError(status);
    }
  }

  const validators = {
    userEmail: {
      required(value){
        return value === '';
      },
      isValidEmail(value){
        return !validator.isEmail(value);
      } 
    },
    userPassword: {
      required(value){
        return value === '';
      },
      minLength(value){
        return value.length < 8;
      }
    }
  }

  return (
    <div className='login'>
      <div className='form__container'>
        <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>Рады видеть!</h1>
        {
          <Form className = 'form'
                type = 'submit'
                // onSubmit = {e => console.log(e)}
                // onChange = {e => console.log(e)}
                validators = {validators}>

            <Field name = 'emailSpan'
                   className = 'form__name-span'>
            
            {(props) => <span {...props}>E-mail</span>}
            
            </Field>
            <Field name = 'userEmail'
                   id='userEmail'
                   className = 'form__input'
                   type = 'email'>

            {({ onChange, ...props}) => { 
              return (<input 
                        className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`} 
                        onFocus={() => errorSpanHandler(props.name, true)}
                        onBlur={() => errorSpanHandler(props.name, false)}
                        onChange={(e) => onChange(e.target.value)} />)
            }}
            
            </Field>

            <Field name = 'userEmail'
                   className = 'form__error-span'
                   errorslist = {{
                     required: 'Поле не должно быть пустым.',                      
                     isValidEmail: 'Введен некорректный имейл.',
                    }}>
              {(props) => {
                return (<span {...props} 
                  className = {`${props.className} ${!emailError && 'form__error-span_type_hidden'}`}>{errorMessageHandler(props)}</span>)
              }}</Field>


            <Field name = 'passwordSpan'
                   className = 'form__name-span' >
              {(props) => {
                return (<span {...props}>Пароль</span>)
            }}</Field>


            <Field name = 'userPassword'
                   id= 'userPassword'
                   className = 'form__input'
                   type = 'password'>
              {({ onChange, ...props}) => {
                return (<input {...props} 
                        className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`} 
                        onChange={(e) => onChange(e.target.value)} 
                        onFocus={() => errorSpanHandler(props.name, true)} 
                        onBlur={() => errorSpanHandler(props.name, false)}/>)
              }}</Field>


            <Field name = 'userPassword'
                   className = 'form__error-span'
                   errorslist = {{
                     required: 'Поле не должно быть пустым',
                     minLength: 'Длина пароля должна быть более 8 символов.',
                   }}>
              {(props) => {
                return (<span {...props} 
                        className={`${props.className} ${!passwordError && 'form__error-span_type_hidden'}`}>
                        {errorMessageHandler(props)}
                        </span>)
            }}</Field>

            <SubmitButton className = 'form__button from__button_place_login' 
                          type = 'submit'>{
              ({ disabled , ...props}) => {
                return (<button {...props} 
                        className={`${props.className} ${disabled && 'form__button_type_disabled'}`}>
                        {'Войти'}
                        </button>)
            }}</SubmitButton>  
          </Form>
        }
        <p className='from__status-ask'>Еще не зарегистрированы?{<Link to='/signup' className='link link_place_form link_place_form-login'> Регистрация</Link>}</p>
      </div>
    </div>
  )
}

export default Login;
