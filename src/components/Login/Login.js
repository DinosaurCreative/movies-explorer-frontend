import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
      <div className='form__container'>
        <Link to='/' href='#' className='logo logo_place_login' />
        <h1 className='form__greeting'>Рады видеть!</h1>
        <form className='form'>
          <span className='form__name-span'>E-mail</span>
          <input className='form__input' type='email'></input>
          <span className='form__name-span'>Пароль</span>
          <input className='form__input' type='password'></input>
        </form>
        <button className='form__button'>Войти</button>
        <p className='from__status-ask'>Еще не зарегистрированы?{<Link to='/signup' className='form__link form__link_register'> Регистрация</Link>}</p>
      </div>
    </div>
  )
}

export default Login;
