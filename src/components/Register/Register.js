import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='register'>
      <div className='form__container'>
      <Link to='/' href='#' className='logo logo_place_register' />
        <h1 className='form__greeting'>Добро пожаловать!</h1>
        <form className='form'>
          <span className='form__name-span'>Имя</span>
          <input className='form__input' type='text'></input>
          <span className='form__error-span'></span>
          <span className='form__name-span'>E-mail</span>
          <input className='form__input' type='email'></input>
          <span className='form__error-span'></span>
          <span className='form__name-span'>Пароль</span>
          <input className='form__input' type='password'></input>
          <span className='form__error-span'></span>
        </form>
        <button className='form__button form__button_place_register'>Зарегистрироваться</button>
        <p className='from__status-ask'>Уже зарегистрированы?{<Link to='/signin' className='form__link'>Войти</Link>}</p>
      </div>
    </div>
  )
}

export default Register;
