import { Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
// import { Form, Field } from '../../utils/Forms';

function Login() {
  
  const [formValues,  setFormValues ] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({...prevState, [name]: value }));
  }, [setFormValues]);

  const { userEmail, userPassword } = formValues;
  
  
  return (
    <div className='login'>
      <div className='form__container'>
        <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>Рады видеть!</h1>
        <form className='form'>
          <span className='form__name-span'>E-mail</span>

          <input className='form__input' 
                 required 
                 type='email' 
                 name='userEmail' 
                 onChange={handleInputChange} 
                 value={userEmail}/>
          
          <span className='form__error-span'></span>

          <span className='form__name-span'>Пароль</span>

          <input className='form__input' 
                 required 
                 type='password' 
                 name='userPassword' 
                 onChange={handleInputChange} 
                 value={userPassword}/>

          <span className='form__error-span'></span>
        </form>
        <button className='form__button from__button_place_login' type='submit'>Войти</button>
        <p className='from__status-ask'>Еще не зарегистрированы?{<Link to='/signup' className='link link_place_form link_place_form-login'> Регистрация</Link>}</p>
      </div>
    </div>
  )
}

export default Login;
