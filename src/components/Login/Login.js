import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
      <div className='form__container'>
        <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>Рады видеть!</h1>
        <form className='form'>
          <span className='form__name-span'>E-mail</span>
          <input className='form__input' required type='email'></input>
          <span className='form__error-span'></span>
          <span className='form__name-span'>Пароль</span>
          <input className='form__input' required type='password'></input>
          <span className='form__error-span'></span>
        </form>
        <button className='form__button from__button_place_login' type='submit'>Войти</button>
        <p className='from__status-ask'>Еще не зарегистрированы?{<Link to='/signup' className='link link_place_form link_place_form-login'> Регистрация</Link>}</p>
      </div>
    </div>
  )
}

export default Login;
