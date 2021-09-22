import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='register'>
      <div className='register__container'>
      <Link to='/' href='#' className='logo logo_place_register' />
        <h1 className='register__greeting'>Добро пожаловать!</h1>
        <form className='register__form'>
          <span className='register__span'>Имя</span>
          <input className='register__input' type='text'></input>
          <span className='register__underline' />
          <span className='register__span'>E-mail</span>
          <input className='register__input' type='email'></input>
          <span className='register__underline' />
          <span className='register__span'>Пароль</span>
          <input className='register__input' type='password'></input>
          <span className='register__underline' />
        </form>
        <button className='register__button'>Зарегистрироваться</button>
        <p className='register__registration-question'>Уже зарегистрированы?{<Link to='/signup' className='register__registration-link'>Войти</Link>}</p>
      </div>
    </div>
  )
}

export default Register;
