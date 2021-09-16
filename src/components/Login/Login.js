import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className='login'>
      <div className='login__container'>
        <Link to='/' href='#' className='logo logo_place_login' />
        <h1 className='login__greeting'>Рады видеть!</h1>
        <form className='login__form'>
          <span className='login__span'>E-mail</span>
          <input className='login__input' type="email"></input>
          <span className='login__underline' />
          <span className='login__span'>Пароль</span>
          <input className='login__input' type="password"></input>
          <span className='login__underline' />
        </form>
        <button className="login__button">Войти</button>
        <p className="login__registration-question">Еще не зарегистрированы?{<Link to="/signup" className="login__registration-link"> Регистрация</Link>}</p>
      </div>
    </div>
  )
}

export default Login;
